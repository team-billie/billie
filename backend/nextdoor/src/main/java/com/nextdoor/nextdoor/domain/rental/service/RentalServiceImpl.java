package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.fintech.event.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.fintech.event.RemittanceCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.domain.AiImageType;
import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.domainservice.RentalDomainService;
import com.nextdoor.nextdoor.domain.rental.domainservice.RentalImageDomainService;
import com.nextdoor.nextdoor.domain.reservation.event.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.DepositProcessingRequestEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RentalCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RentalCreatedEvent;
import com.nextdoor.nextdoor.domain.rental.exception.NoSuchRentalException;
import com.nextdoor.nextdoor.domain.rental.port.RentalQueryPort;
import com.nextdoor.nextdoor.domain.rental.port.ReservationQueryPort;
import com.nextdoor.nextdoor.domain.reservation.exception.NoSuchReservationException;
import com.nextdoor.nextdoor.domain.rental.port.S3ImageUploadPort;
import com.nextdoor.nextdoor.domain.rental.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final S3ImageUploadPort s3ImageUploadService;
    private final ReservationQueryPort reservationQueryPort;
    private final RentalQueryPort rentalQueryPort;
    private final RentalScheduleService rentalScheduleService;
    private final RentalDomainService rentalDomainService;
    private final RentalImageDomainService rentalImageDomainService;
    private final ApplicationEventPublisher eventPublisher;

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
    }

    @Override
    @Transactional
    public UploadImageResult registerBeforePhoto(UploadImageCommand command) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        String path = rentalImageDomainService.createImagePath(
                String.valueOf(rental.getRentalId()),
                AiImageType.BEFORE
        );

        S3UploadResult imageUploadResult = s3ImageUploadService.upload(command.getFile(), path);

        rentalImageDomainService.processRentalImage(
                rental,
                imageUploadResult.getUrl(),
                command.getFile().getContentType(),
                AiImageType.BEFORE
        );

        LocalDateTime uploadedAt = LocalDateTime.now();
        return UploadImageResult.builder()
                .rentalId(rental.getRentalId())
                .imageUrl(imageUploadResult.getUrl())
                .uploadedAt(uploadedAt)
                .build();
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
    @Transactional
    public void completeRemittanceProcessing(RemittanceCompletedEvent remittanceCompletedEvent){
        Rental rental = rentalRepository.findByRentalId(remittanceCompletedEvent.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.processRemittanceCompletion();
    }

    @Override
    @Transactional
    public void completeRentalEndProcessing(Long rentalId){
        Rental rental = rentalRepository.findByRentalId(rentalId)
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.processRentalPeriodEnd();
    }

    @Override
    @Transactional
    public UploadImageResult registerAfterPhoto(UploadImageCommand command) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        String path = rentalImageDomainService.createImagePath(
                String.valueOf(rental.getRentalId()),
                AiImageType.AFTER
        );

        S3UploadResult imageUploadResult = s3ImageUploadService.upload(command.getFile(), path);

        rentalImageDomainService.processRentalImage(
                rental,
                imageUploadResult.getUrl(),
                command.getFile().getContentType(),
                AiImageType.AFTER
        );

        ReservationDto reservationDto = reservationQueryPort.getReservationByRentalId(rental.getRentalId())
                .orElseThrow(() -> new NoSuchReservationException("예약 정보가 존재하지 않습니다."));

        rentalDomainService.processAfterImageRegistration(rental, reservationDto.getDeposit());

        if(rental.getRentalStatus().equals(RentalStatus.AFTER_PHOTO_REGISTERED)){
            eventPublisher.publishEvent(DepositProcessingRequestEvent.builder()
                    .rentalId(rental.getRentalId())
                    .build());
        } else if(rental.getRentalStatus().equals(RentalStatus. RENTAL_COMPLETED)){
            rental.updateDealCount();
            eventPublisher.publishEvent(RentalCompletedEvent.builder()
                    .rentalId(rental.getRentalId())
                    .build());
        }

        LocalDateTime uploadedAt = LocalDateTime.now();
        return UploadImageResult.builder()
                .rentalId(rental.getRentalId())
                .imageUrl(imageUploadResult.getUrl())
                .uploadedAt(uploadedAt)
                .build();
    }

    @Override
    public Page<SearchRentalResult> searchRentals(SearchRentalCommand command) {
        return rentalQueryPort.searchRentals(command);
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
    public AiAnalysisResult getAiAnalysis(Long rentalId) {
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
    public UpdateAccountResult updateAccount(UpdateAccountCommand command) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        rental.processUpdateAccountInfo(command.getAccountNo(), command.getBankCode());

        return UpdateAccountResult.builder()
                .rentalId(rental.getRentalId())
                .accountNo(rental.getAccountNo())
                .bankCode(rental.getBankCode())
                .build();
    }

    @Override
    public ManagedRentalCountResult countManagedRentals(Long ownerId) {
        return rentalQueryPort.countManagedRentals(ownerId);
    }
}
