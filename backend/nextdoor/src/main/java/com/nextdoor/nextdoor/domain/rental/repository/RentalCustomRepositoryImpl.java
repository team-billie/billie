package com.nextdoor.nextdoor.domain.rental.repository;

import com.nextdoor.nextdoor.domain.rental.domain.*;
import com.nextdoor.nextdoor.domain.rental.service.dto.AiAnalysisResult;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalResult;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RentalCustomRepositoryImpl implements RentalCustomRepository {

    private final JPAQueryFactory queryFactory;
    private final QRental rental = QRental.rental;
    private final QAiImage aiImage = QAiImage.aiImage;

    @Override
    public Optional<AiAnalysisResult> findRentalWithImagesByRentalId(Long rentalId) {
        Rental foundRental = queryFactory
                .selectFrom(rental)
                .leftJoin(rental.aiImages, aiImage).fetchJoin()
                .where(rental.rentalId.eq(rentalId))
                .fetchOne();

        if (foundRental == null) {
            return Optional.empty();
        }

        AiAnalysisResult result = getAiAnalysisResult(foundRental);

        return Optional.of(result);
    }

    private static AiAnalysisResult getAiAnalysisResult(Rental foundRental) {
        List<String> beforeImages = new ArrayList<>();
        List<String> afterImages = new ArrayList<>();

        for (AiImage image : foundRental.getAiImages()) {
            if (AiImageType.BEFORE.equals(image.getType())) {
                beforeImages.add(image.getImageUrl());
            } else if (AiImageType.AFTER.equals(image.getType())) {
                afterImages.add(image.getImageUrl());
            }
        }

        AiAnalysisResult result = new AiAnalysisResult();
        result.setBeforeImages(beforeImages);
        result.setAfterImages(afterImages);
        result.setAnalysis(foundRental.getComparedAnalysis());
        return result;
    }
}
