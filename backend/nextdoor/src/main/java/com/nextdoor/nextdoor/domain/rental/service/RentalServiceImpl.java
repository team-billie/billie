package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.event.in.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RequestRemittanceNotificationEvent;
import com.nextdoor.nextdoor.domain.rental.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rental.service.dto.RequestRemittanceCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.S3UploadResult;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadImageResult;
import com.nextdoor.nextdoor.domain.rental.strategy.RentalImageStrategy;
import org.springframework.context.ApplicationEventPublisher;
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
    private final Map<AiImageType, RentalImageStrategy> rentalImageStrategies;
    private final ApplicationEventPublisher eventPublisher;

    public RentalServiceImpl(
            RentalRepository rentalRepository,
            S3ImageUploadService s3ImageUploadService,
            List<RentalImageStrategy> strategyList,
            ApplicationEventPublisher eventPublisher) {
        this.rentalRepository = rentalRepository;
        this.s3ImageUploadService = s3ImageUploadService;


        this.rentalImageStrategies = strategyList.stream()
                .collect(Collectors.toMap(
                        RentalImageStrategy::getImageType,
                        strategy -> strategy
                ));

        this.eventPublisher = eventPublisher;
    }

    @Override
    public void createFromReservation(ReservationConfirmedEvent reservationConfirmedEvent) {
        Rental createdRental = Rental.createFromReservation(reservationConfirmedEvent.getReservationId());
        rentalRepository.save(createdRental);
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
                .orElseThrow(() -> new IllegalArgumentException("대여 정보가 존재하지 않습니다."));

        rental.requestRemittance(command.getRemittanceAmount());

        //TODO : renterId에 대한 회원 검증, amount 값 범위 검증 고려
        eventPublisher.publishEvent(RequestRemittanceNotificationEvent.builder()
                .rentalId(command.getRentalId())
                .renterId(command.getRenterId())
                .amount(command.getRemittanceAmount())
                .build());
    }

    @Override
    @Transactional
    public UploadImageResult registerAfterPhoto(UploadImageCommand command) {
       return processRentalImage(command, rentalImageStrategies.get(AiImageType.AFTER));
    }

    private UploadImageResult processRentalImage(UploadImageCommand command, RentalImageStrategy strategy) {
        Rental rental = rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new IllegalArgumentException("대여 정보가 존재하지 않습니다."));

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
}
