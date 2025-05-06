package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.enums.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.event.in.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.event.in.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.DepositProcessingRequestEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RentalCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RequestRemittanceNotificationEvent;
import com.nextdoor.nextdoor.domain.rental.exception.InvalidRenterIdException;
import com.nextdoor.nextdoor.domain.rental.exception.NoSuchRentalException;
import com.nextdoor.nextdoor.domain.rental.port.AiAnalysisQueryPort;
import com.nextdoor.nextdoor.domain.rental.port.RentalQueryPort;
import com.nextdoor.nextdoor.domain.rental.port.ReservationService;
import com.nextdoor.nextdoor.domain.rental.port.S3ImageUploadService;
import com.nextdoor.nextdoor.domain.rental.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import com.nextdoor.nextdoor.domain.rental.strategy.RentalImageStrategy;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final S3ImageUploadService s3ImageUploadService;
    private final ReservationService reservationService;
    private final AiAnalysisQueryPort aiAnalysisQueryPort;
    private final RentalQueryPort rentalQueryPort;
    private final RentalScheduleService rentalScheduleService;
    private final Map<AiImageType, RentalImageStrategy> rentalImageStrategies;
    private final ApplicationEventPublisher eventPublisher;

    public RentalServiceImpl(
            RentalRepository rentalRepository,
            S3ImageUploadService s3ImageUploadService,
            RentalQueryPort rentalQueryPort,
            RentalScheduleService rentalScheduleService,
            List<RentalImageStrategy> strategyList,
            ApplicationEventPublisher eventPublisher, ReservationService reservationService, AiAnalysisQueryPort aiAnalysisQueryPort) {
        this.rentalRepository = rentalRepository;
        this.s3ImageUploadService = s3ImageUploadService;
        this.rentalQueryPort = rentalQueryPort;
        this.rentalScheduleService = rentalScheduleService;

        this.rentalImageStrategies = strategyList.stream()
                .collect(Collectors.toMap(
                        RentalImageStrategy::getImageType,
                        strategy -> strategy
                ));

        this.eventPublisher = eventPublisher;
        this.reservationService = reservationService;
        this.aiAnalysisQueryPort = aiAnalysisQueryPort;
    }

    @Override
    public void createFromReservation(ReservationConfirmedEvent reservationConfirmedEvent) {
        Rental createdRental = Rental.createFromReservation(reservationConfirmedEvent.getReservationId());
        rentalRepository.save(createdRental);
        rentalScheduleService.scheduleRentalEnd(createdRental.getRentalId(), reservationConfirmedEvent.getEndDate());
    }

    @Override
    @Transactional
    public UploadImageResult registerBeforePhoto(UploadImageCommand command) {
        return processRentalImage(command, rentalImageStrategies.get(AiImageType.BEFORE));
    }

    @Override
    @Transactional
    public void requestRemittance(RequestRemittanceCommand command) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        ReservationDto reservationDto = reservationService.getReservationByRentalId(rental.getRentalId());
        if (!reservationDto.getRenterId().equals(command.getRenterId())) {
            throw new InvalidRenterIdException("요청한 대여자 ID가 실제 대여자 ID와 일치하지 않습니다.");
        }

        rental.requestRemittance(command.getRemittanceAmount());

        eventPublisher.publishEvent(RequestRemittanceNotificationEvent.builder()
                .rentalId(command.getRentalId())
                .renterId(command.getRenterId())
                .amount(command.getRemittanceAmount())
                .build());
    }

    @Override
    @Transactional
    public UploadImageResult registerAfterPhoto(UploadImageCommand command) {
        UploadImageResult result = processRentalImage(command, rentalImageStrategies.get(AiImageType.AFTER));

        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        ReservationDto reservationDto = reservationService.getReservationByRentalId(rental.getRentalId());

        rental.processAfterImageRegistration(reservationDto.getDeposit());

        if(rental.getRentalStatus().equals(RentalStatus.AFTER_PHOTO_REGISTERED)){
            eventPublisher.publishEvent(DepositProcessingRequestEvent.builder()
                    .rentalId(rental.getRentalId())
                    .build());
        } else if(rental.getRentalStatus().equals(RentalStatus.RENTAL_COMPLETED)){
            eventPublisher.publishEvent(RentalCompletedEvent.builder()
                    .rentalId(rental.getRentalId())
                    .build());
        }

        return result;
    }

    private UploadImageResult processRentalImage(UploadImageCommand command, RentalImageStrategy strategy) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        String path = strategy.createImagePath(String.valueOf(rental.getRentalId()));
        S3UploadResult imageUploadResult = s3ImageUploadService.upload(command.getFile(), path);
        strategy.updateRentalImage(rental, imageUploadResult.getUrl(), command.getFile().getContentType());

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
    public AiAnalysisResult getAiAnalysis(Long rentalId) {
        rentalRepository.findByRentalId(rentalId)
                .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

        return aiAnalysisQueryPort.getAiAnalysisResult(rentalId);
    }
}