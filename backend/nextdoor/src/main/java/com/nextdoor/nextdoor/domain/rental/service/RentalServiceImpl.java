package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.event.in.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RequestRemittanceNotificationEvent;
import com.nextdoor.nextdoor.domain.rental.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import com.nextdoor.nextdoor.domain.rental.strategy.AfterImageStatusStrategy;
import com.nextdoor.nextdoor.domain.rental.strategy.BeforeImageStatusStrategy;
import com.nextdoor.nextdoor.domain.rental.strategy.RentalStatusStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final S3ImageUploadService s3ImageUploadService;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public void createFromReservation(ReservationConfirmedEvent reservationConfirmedEvent) {
        Rental createdRental = Rental.createFromReservation(reservationConfirmedEvent.getReservationId());
        rentalRepository.save(createdRental);
    }

    @Override
    @Transactional
    public UploadImageResult registerBeforePhoto(UploadImageCommand command) {
        return processRentalImage(command, new BeforeImageStatusStrategy());
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
       return processRentalImage(command, new AfterImageStatusStrategy());
    }

    private UploadImageResult processRentalImage(UploadImageCommand command, RentalStatusStrategy rentalStatusStrategy) {
        Rental rental = this.rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new IllegalArgumentException("대여 정보가 존재하지 않습니다."));

        //TODO : s3 업로드 구현체, 업로드 예외 처리
        S3UploadResult imageUploadResult = s3ImageUploadService.upload(command.getFile(), "rentals/" + rental.getRentalId() + "/after");
        rentalStatusStrategy.updateRentalStatus(rental ,imageUploadResult.getUrl(), command.getFile().getContentType());
        LocalDateTime uploadedAt = LocalDateTime.now();

        return UploadImageResult.builder()
                .rentalId(rental.getRentalId())
                .imageUrl(imageUploadResult.getUrl())
                .uploadedAt(uploadedAt)
                .build();
    }
}
