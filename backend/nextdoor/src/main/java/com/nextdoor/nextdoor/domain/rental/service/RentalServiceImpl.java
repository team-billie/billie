package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.enums.Role;
import com.nextdoor.nextdoor.domain.rental.event.in.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RequestRemittanceNotificationEvent;
import com.nextdoor.nextdoor.domain.rental.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import com.nextdoor.nextdoor.domain.rental.strategy.RentalImageStrategy;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final S3ImageUploadService s3ImageUploadService;
    private final ReservationService reservationService;
    private final FeedService feedService;
    private final Map<AiImageType, RentalImageStrategy> rentalImageStrategies;
    private final ApplicationEventPublisher eventPublisher;

    public RentalServiceImpl(
            RentalRepository rentalRepository,
            S3ImageUploadService s3ImageUploadService,
            ReservationService reservationService,
            FeedService feedService,
            List<RentalImageStrategy> strategyList,
            ApplicationEventPublisher eventPublisher) {
        this.rentalRepository = rentalRepository;
        this.s3ImageUploadService = s3ImageUploadService;
        this.reservationService = reservationService;
        this.feedService = feedService;

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

    @Override
    public Page<SearchRentalResult> searchRentals(SearchRentalCommand command) {
        List<ReservationDto> reservations = new ArrayList<>();
        if(command.getUserRole().equals(Role.OWNER.name())) {
            reservations = reservationService.getReservationsByOwnerId(command.getUserId(), command.getPageable());
        }else if(command.getUserRole().equals(Role.RENTER.name())) {
            reservations = reservationService.getReservationsByRenterId(command.getUserId(), command.getPageable());
        }

        if (reservations.isEmpty()) {
            return Page.empty(command.getPageable());
        }

        List<Long> reservationIds = reservations.stream()
                .map(ReservationDto::getReservationId)
                .toList();

        List<Rental> rentals = rentalRepository.findByReservationIdIn(reservationIds);
        Map<Long, Rental> rentalMap = rentals.stream()
                .collect(Collectors.toMap(
                        Rental::getReservationId,
                        rental -> rental
                ));

        List<Long> feedIds = reservations.stream()
                .map(ReservationDto::getFeedId)
                .toList();

        List<FeedDto> feeds = feedService.getFeedsByIds(feedIds);
        Map<Long, FeedDto> feedDtoMap = feeds.stream()
                .collect(Collectors.toMap(
                   feed -> feed.getId(),
                        feed -> feed
                ));

        List<SearchRentalResult> results = reservations.stream()
                .map(reservation -> {
                    Rental rental = rentalMap.get(reservation.getReservationId());
                    if(rental == null) {
                        return null;
                    }

                    FeedDto feed = feedDtoMap.get(reservation.getFeedId());
                    if(feed == null) {
                        return null;
                    }

                    return SearchRentalResult.builder()
                            .reservationId(reservation.getReservationId())
                            .startDate(reservation.getStartDate())
                            .endDate(reservation.getEndDate())
                            .rentalFee(reservation.getRentalFee())
                            .deposit(reservation.getDeposit())
                            .reservationStatus(reservation.getReservationStatus())
                            .ownerId(reservation.getOwnerId())
                            .renterId(reservation.getRenterId())
                            .rentalId(rental.getRentalId())
                            .rentalStatus(String.valueOf(rental.getRentalStatus()))
                            .title(feed.getTitle())
                            .productImageUrl(feed.getProductImageUrl())
                            .build();
                })
                .filter(Objects::nonNull)
                .toList();

        long totalElements = reservationService.countReservations(command.getUserId(), command.getUserRole());
        return new PageImpl<>(results, command.getPageable(), totalElements);
    }
}
