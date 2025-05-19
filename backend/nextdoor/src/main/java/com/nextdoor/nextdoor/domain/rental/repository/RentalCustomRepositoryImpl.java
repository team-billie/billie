package com.nextdoor.nextdoor.domain.rental.repository;

import com.nextdoor.nextdoor.domain.rental.domain.*;
import com.nextdoor.nextdoor.domain.rental.service.dto.AiAnalysisResult;
import com.nextdoor.nextdoor.domain.rental.service.dto.AiComparisonResult;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
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
    private final QAiImage beforeAiImage = new QAiImage("beforeAiImage");
    private final QAiImage afterAiImage = new QAiImage("afterAiImage");
    private final QAiImageComparisonPair aiImageComparisonPair = QAiImageComparisonPair.aiImageComparisonPair;

    @Override
    public Optional<AiComparisonResult> findRentalWithImagesByRentalId(Long rentalId) {
        Rental foundRental = queryFactory
                .selectFrom(rental)
                .leftJoin(rental.aiImages, aiImage).fetchJoin()
                .where(rental.rentalId.eq(rentalId))
                .fetchOne();
        if (foundRental == null) {
            return Optional.empty();
        }

        List<AiComparisonResult.MatchingResult> matchingResults = queryFactory.select(Projections.constructor(
                        AiComparisonResult.MatchingResult.class,
                        beforeAiImage.imageUrl,
                        afterAiImage.imageUrl,
                        aiImageComparisonPair.pairComparisonResult))
                .from(aiImageComparisonPair)
                .leftJoin(beforeAiImage).on(aiImageComparisonPair.beforeImageId.eq(beforeAiImage.id)).fetchJoin()
                .leftJoin(afterAiImage).on(aiImageComparisonPair.afterImageId.eq(afterAiImage.id)).fetchJoin()
                .fetch();

        AiComparisonResult result = getAiComparisonResult(foundRental, matchingResults);

        return Optional.of(result);
    }

    private static AiComparisonResult getAiComparisonResult(Rental foundRental, List<AiComparisonResult.MatchingResult> matchingResults) {
        List<String> beforeImages = new ArrayList<>();
        List<String> afterImages = new ArrayList<>();

        for (AiImage image : foundRental.getAiImages()) {
            if (AiImageType.BEFORE.equals(image.getType())) {
                beforeImages.add(image.getImageUrl());
            } else if (AiImageType.AFTER.equals(image.getType())) {
                afterImages.add(image.getImageUrl());
            }
        }

        return new AiComparisonResult(
                beforeImages,
                afterImages,
                foundRental.getComparedAnalysis(),
                matchingResults
        );
    }
}
