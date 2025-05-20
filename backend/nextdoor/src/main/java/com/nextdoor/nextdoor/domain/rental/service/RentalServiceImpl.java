package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.fintech.event.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.fintech.event.RemittanceCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.domain.*;
import com.nextdoor.nextdoor.domain.rental.domainservice.RentalDomainService;
import com.nextdoor.nextdoor.domain.rental.domainservice.RentalImageDomainService;
import com.nextdoor.nextdoor.domain.rental.event.out.DepositProcessingRequestEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RentalCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RentalCreatedEvent;
import com.nextdoor.nextdoor.domain.rental.exception.InvalidRenterIdException;
import com.nextdoor.nextdoor.domain.rental.exception.NoSuchRentalException;
import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;
import com.nextdoor.nextdoor.domain.rental.message.RequestRemittanceStatusMessage;
import com.nextdoor.nextdoor.domain.rental.port.*;
import com.nextdoor.nextdoor.domain.rental.repository.AiImageComparisonPairRepository;
import com.nextdoor.nextdoor.domain.rental.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import com.nextdoor.nextdoor.domain.reservation.event.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.reservation.exception.NoSuchReservationException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final AiImageComparisonPairRepository aiImageComparisonPairRepository;
    private final S3ImageUploadPort s3ImageUploadService;
    private final ReservationQueryPort reservationQueryPort;
    private final RentalQueryPort rentalQueryPort;
    private final MemberUuidQueryPort memberUuidQueryPort;
    private final RentalDetailQueryPort rentalDetailQueryPort;
    private final RentalScheduleService rentalScheduleService;
    private final RentalDomainService rentalDomainService;
    private final RentalImageDomainService rentalImageDomainService;
    private final ApplicationEventPublisher eventPublisher;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    @Transactional
    public void createFromReservation(ReservationConfirmedEvent reservationConfirmedEvent) {
        Rental createdRental = Rental.createFromReservation(reservationConfirmedEvent.getReservationId());
        rentalRepository.save(createdRental);
        rentalScheduleService.scheduleRentalEnd(createdRental.getRentalId(), reservationConfirmedEvent.getEndDate());

        eventPublisher.publishEvent(RentalCreatedEvent.builder()
                .rentalId(createdRental.getRentalId())
                .reservationId(reservationConfirmedEvent.getReservationId())
                .build());

        String ownerUuid = memberUuidQueryPort.getMemberUuidByRentalIdAndRole(
                createdRental.getRentalId(),
                "OWNER"
        );

        RentalStatusMessage.RentalDetailResult rentalDetailResult = rentalDetailQueryPort.getRentalDetailByRentalIdAndRole(
                createdRental.getRentalId()
        );

        messagingTemplate.convertAndSend(
                "/topic/rental/" + ownerUuid + "/status",
                RequestRemittanceStatusMessage.builder()
                        .rentalId(createdRental.getRentalId())
                        .process(RentalProcess.BEFORE_RENTAL.name())
                        .detailStatus(RentalStatus.CREATED.name())
                        .rentalDetail(rentalDetailResult)
                        .build()
        );

        messagingTemplate.convertAndSend(
                "/topic/rental/" + createdRental.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.BEFORE_RENTAL.name())
                        .detailStatus(RentalStatus.CREATED.name())
                        .rentalDetail(rentalDetailResult)
                        .build()
        );
    }

    @Override
    public Page<SearchRentalResult> searchRentals(SearchRentalCommand command) {
        return rentalQueryPort.searchRentals(command);
    }

    @Override
    @Transactional
    public RequestRemittanceResult requestRemittance(RequestRemittanceCommand command) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.processRemittanceRequest();

        return rentalQueryPort.findRemittanceRequestViewData(command.getRentalId())
                .orElseThrow(() -> new NoSuchReservationException("예약 정보가 존재하지 않습니다."));
    }

    @Override
    @Transactional(readOnly = true)
    public RequestRemittanceResult getRemittanceData(Long rentalId) {
        return rentalQueryPort.findRemittanceRequestViewData(rentalId)
                .orElseThrow(() -> new NoSuchReservationException("예약 정보가 존재하지 않습니다."));
    }

    @Override
    @Transactional
    public UploadImageResult registerBeforePhoto(UploadImageCommand command) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        ReservationDto reservation = reservationQueryPort.getReservationByRentalId(rental.getRentalId())
                .orElseThrow(() -> new NoSuchReservationException("예약 정보가 존재하지 않습니다."));

        if (!reservation.getRenterId().equals(command.getUserId())) {
            throw new InvalidRenterIdException("요청한 Renter ID가 실제 Renter ID와 일치하지 않습니다.");
        }

        String path = rentalImageDomainService.createImagePath(
                String.valueOf(rental.getRentalId()),
                AiImageType.BEFORE
        );

        List<String> imageUrls = new ArrayList<>();
        for(MultipartFile image : command.getImages()){
            S3UploadResult imageUploadResult = s3ImageUploadService.upload(image, path);
            imageUrls.add(imageUploadResult.getUrl());

            rentalImageDomainService.processRentalImage(
                    rental,
                    imageUploadResult.getUrl(),
                    image.getContentType(),
                    AiImageType.BEFORE
            );
        }

        LocalDateTime uploadedAt = LocalDateTime.now();
        return UploadImageResult.builder()
                .rentalId(rental.getRentalId())
                .imageUrls(imageUrls)
                .uploadedAt(uploadedAt)
                .build();
    }

    @Override
    @Transactional
    public void completeRemittanceProcessing(RemittanceCompletedEvent remittanceCompletedEvent){
        Rental rental = rentalRepository.findByRentalId(remittanceCompletedEvent.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.processRemittanceCompletion();

        String ownerUuid = memberUuidQueryPort.getMemberUuidByRentalIdAndRole(
                rental.getRentalId(),
                "OWNER"
        );

        RentalStatusMessage.RentalDetailResult rentalDetailResult = rentalDetailQueryPort.getRentalDetailByRentalIdAndRole(
                rental.getRentalId()
        );

        messagingTemplate.convertAndSend("/topic/rental/" + ownerUuid + "/status",
                RentalStatusMessage.builder()
                        .rentalId(rental.getRentalId())
                        .process(RentalProcess.RENTAL_IN_ACTIVE.name())
                        .detailStatus(RentalStatus.REMITTANCE_COMPLETED.name())
                        .rentalDetail(rentalDetailResult)
                        .build()
        );

        messagingTemplate.convertAndSend(
                "/topic/rental/" + rental.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.BEFORE_RENTAL.name())
                        .detailStatus(RentalStatus.CREATED.name())
                        .rentalDetail(rentalDetailResult)
                        .build()
        );
    }

    @Override
    @Transactional
    public void completeRentalEndProcessing(Long rentalId){
        Rental rental = rentalRepository.findByRentalId(rentalId)
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.processRentalPeriodEnd();

        String renterUuid = memberUuidQueryPort.getMemberUuidByRentalIdAndRole(
                rental.getRentalId(),
                "RENTER"
        );

        RentalStatusMessage.RentalDetailResult rentalDetailResult = rentalDetailQueryPort.getRentalDetailByRentalIdAndRole(
                rental.getRentalId()
        );

        messagingTemplate.convertAndSend("/topic/rental/" + renterUuid + "/status"
                , RentalStatusMessage.builder()
                        .rentalId(rental.getRentalId())
                        .process(RentalProcess.RETURNED.name())
                        .detailStatus(RentalStatus.RENTAL_PERIOD_ENDED.name())
                        .rentalDetail(rentalDetailResult)
                        .build()
        );

        messagingTemplate.convertAndSend(
                "/topic/rental/" + rental.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.RETURNED.name())
                        .detailStatus(RentalStatus.RENTAL_PERIOD_ENDED.name())
                        .rentalDetail(rentalDetailResult)
                        .build()
        );
    }

    @Override
    @Transactional
    public UploadImageResult registerAfterPhoto(UploadImageCommand command) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        ReservationDto reservation = reservationQueryPort.getReservationByRentalId(rental.getRentalId())
                .orElseThrow(() -> new NoSuchReservationException("예약 정보가 존재하지 않습니다."));

        if (!reservation.getOwnerId().equals(command.getUserId())) {
            throw new InvalidRenterIdException("요청한 Owner ID가 실제 Owner ID와 일치하지 않습니다.");
        }

        String path = rentalImageDomainService.createImagePath(
                String.valueOf(rental.getRentalId()),
                AiImageType.AFTER
        );

        List<String> imageUrls = new ArrayList<>();
        for(MultipartFile image : command.getImages()){
            S3UploadResult imageUploadResult = s3ImageUploadService.upload(image, path);
            imageUrls.add(imageUploadResult.getUrl());

            rentalImageDomainService.processRentalImage(
                    rental,
                    imageUploadResult.getUrl(),
                    image.getContentType(),
                    AiImageType.AFTER
            );
        }

        LocalDateTime uploadedAt = LocalDateTime.now();
        return UploadImageResult.builder()
                .rentalId(rental.getRentalId())
                .imageUrls(imageUrls)
                .uploadedAt(uploadedAt)
                .build();
    }

    @Override
    @Transactional
    public void completeDepositProcessing(DepositCompletedEvent depositCompletedEvent) {
        Rental rental = rentalRepository.findByRentalId(depositCompletedEvent.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.processDepositCompletion();
    }

    @Override
    @Transactional
    public void updateRentalDepositId(Long rentalId, Long depositId) {
        Rental rental = rentalRepository.findByRentalId(rentalId)
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.updateDepositId(depositId);
    }

    @Override
    public AiComparisonResult getAiAnalysis(Long rentalId) {
        rentalRepository.findByRentalId(rentalId)
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        return rentalRepository.findRentalWithImagesByRentalId(rentalId).orElse(null);
    }

    @Override
    @Transactional
    public void updateDamageAnalysis(Long rentalId, String damageAnalysis) {
        Rental rental = rentalRepository.findByRentalId(rentalId)
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.updateDamageAnalysis(damageAnalysis);
    }

    @Override
    @Transactional
    public void updateComparedAnalysis(Long rentalId, String comparedAnalysis) {
        Rental rental = rentalRepository.findByRentalId(rentalId)
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.updateComparedAnalysis(comparedAnalysis);

        ReservationDto reservationDto = reservationQueryPort.getReservationByRentalId(rental.getRentalId())
                .orElseThrow(() -> new NoSuchReservationException("예약 정보가 존재하지 않습니다."));

        rentalDomainService.processAfterImageRegistration(rental, reservationDto.getDeposit());

        if(rental.getRentalStatus().equals(RentalStatus.BEFORE_AND_AFTER_COMPARED)){
            eventPublisher.publishEvent(DepositProcessingRequestEvent.builder()
                    .rentalId(rental.getRentalId())
                    .build());
        } else if(rental.getRentalStatus().equals(RentalStatus.RENTAL_COMPLETED)){
            rental.updateDealCount();
            eventPublisher.publishEvent(RentalCompletedEvent.builder()
                    .rentalId(rental.getRentalId())
                    .build());
        }
    }

    @Override
    @Transactional
    public UpdateAccountResult updateAccount(UpdateAccountCommand command) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.processUpdateAccountInfo(command.getAccountNo(), command.getBankCode());
        rental.updateFinalAmount(command.getFinalAmount());

        String renterUuid = memberUuidQueryPort.getMemberUuidByRentalIdAndRole(
                rental.getRentalId(),
                "RENTER"
        );

        RentalStatusMessage.RentalDetailResult rentalDetailResult = rentalDetailQueryPort.getRentalDetailByRentalIdAndRole(
                rental.getRentalId()
        );

        messagingTemplate.convertAndSend(
                "/topic/rental/" + renterUuid + "/status",
                RentalStatusMessage.builder()
                        .rentalId(rental.getRentalId())
                        .process(RentalProcess.BEFORE_RENTAL.name())
                        .detailStatus(RentalStatus.REMITTANCE_REQUESTED.name())
                        .rentalDetail(rentalDetailResult)
                        .build()
        );

        messagingTemplate.convertAndSend(
                "/topic/rental/" + rental.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.BEFORE_RENTAL.name())
                        .detailStatus(RentalStatus.REMITTANCE_REQUESTED.name())
                        .rentalDetail(rentalDetailResult)
                        .build()
        );

        return UpdateAccountResult.builder()
                .rentalId(rental.getRentalId())
                .accountNo(rental.getAccountNo())
                .bankCode(rental.getBankCode())
                .finalAmount(rental.getFinalAmount())
                .build();
    }

    @Override
    public ManagedRentalCountResult countManagedRentals(Long ownerId) {
        return rentalQueryPort.countManagedRentals(ownerId);
    }

    @Override
    @Transactional(readOnly = true)
    public SearchRentalResult getRentalById(Long rentalId) {
        return rentalQueryPort.findRentalById(rentalId)
                .orElseThrow(() -> new NoSuchRentalException("ID가 " + rentalId + "인 대여 정보가 존재하지 않습니다."));
    }

    @Override
    @Transactional
    public DeleteRentalResult deleteRental(DeleteRentalCommand command) {
        try {
            Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                    .orElseThrow(() -> new NoSuchRentalException("ID가 " + command.getRentalId() + "인 대여 정보가 존재하지 않습니다."));

            rentalRepository.delete(rental);

            return DeleteRentalResult.builder()
                    .rentalId(command.getRentalId())
                    .success(true)
                    .message("대여 정보가 성공적으로 삭제되었습니다.")
                    .build();
        } catch (NoSuchRentalException e) {
            return DeleteRentalResult.builder()
                    .rentalId(command.getRentalId())
                    .success(false)
                    .message(e.getMessage())
                    .build();
        } catch (Exception e) {
            return DeleteRentalResult.builder()
                    .rentalId(command.getRentalId())
                    .success(false)
                    .message("대여 정보 삭제 중 오류가 발생했습니다: " + e.getMessage())
                    .build();
        }
    }

    @Override
    @Transactional
    public void createAiImageComparisonPair(Long rentalId, Long beforeImageId, Long afterImageId, String pairComparisonResult) {
        aiImageComparisonPairRepository.save(new AiImageComparisonPair(rentalId, beforeImageId, afterImageId, pairComparisonResult));
    }

    @Override
    @Transactional
    public void deleteAiImageComparisonPairByRentalId(Long rentalId) {
        aiImageComparisonPairRepository.deleteByRentalId(rentalId);
    }
}
