package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.event.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.event.UploadImageEvent;
import com.nextdoor.nextdoor.domain.rental.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rental.service.dto.S3UploadResult;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageResult;
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
    public UploadBeforeImageResult registerBeforePhoto(UploadBeforeImageCommand command) {
        Rental rental = this.rentalRepository.findByRentalId(command.getRentalId())
                .orElseThrow(() -> new IllegalArgumentException("대여 정보가 존재하지 않습니다."));

        //TODO : s3 업로드 구현체, 업로드 예외 처리
        S3UploadResult imageUploadResult = s3ImageUploadService.upload(command.getFile(), "rentals/" + rental.getRentalId() + "/before");
        rental.saveAiImage(imageUploadResult.getUrl(), command.getFile().getContentType());
        LocalDateTime uploadedAt = LocalDateTime.now();

        return new UploadBeforeImageResult(rental.getRentalId(), imageUploadResult.getUrl(), uploadedAt);
    }
}
