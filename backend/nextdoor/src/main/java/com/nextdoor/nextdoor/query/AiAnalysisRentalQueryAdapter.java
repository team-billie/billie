package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.aianalysis.enums.AiImageType;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisRentalQueryPort;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;
import com.nextdoor.nextdoor.domain.rental.domain.QAiImage;
import com.nextdoor.nextdoor.domain.rental.domain.QRental;
import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
@Adapter
public class AiAnalysisRentalQueryAdapter implements AiAnalysisRentalQueryPort {

    private final JPAQueryFactory jpaQueryFactory;
    private final QRental qRental = QRental.rental;
    private final QAiImage qAiImage = QAiImage.aiImage;

    @Override
    public RentalDto findById(Long id) {
        Rental rental = Optional.ofNullable(jpaQueryFactory.select(qRental)
                        .from(qRental)
                        .join(qAiImage)
                        .on(qRental.rentalId.eq(qAiImage.rental.rentalId))
                        .fetchJoin()
                        .where(qRental.rentalId.eq(id))
                        .fetchOne())
                .orElseThrow();
        return RentalDto.builder()
                .rentalId(rental.getRentalId())
                .reservationId(rental.getReservationId())
                .rentalStatus(rental.getRentalStatus().name())
                .damageAnalysis(rental.getDamageAnalysis())
                .comparedAnalysis(rental.getComparedAnalysis())
                .aiImages(rental.getAiImages().stream().map(aiImage -> RentalDto.AiImageDto.builder()
                        .aiImageId(aiImage.getId())
                        .type(AiImageType.valueOf(aiImage.getType().name()))
                        .imageUrl(aiImage.getImageUrl())
                        .mimeType(aiImage.getMimeType())
                        .rentalId(rental.getRentalId())
                        .build()).toList())
                .build();
    }
}
