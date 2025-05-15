package com.nextdoor.nextdoor.domain.rental.domainservice;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.domain.AiImageType;
import com.nextdoor.nextdoor.domain.rental.strategy.RentalImageStrategy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 대여 이미지 관련 순수 도메인 로직을 처리하는 도메인 서비스
 * 이미지 전략 관리 및 이미지 처리 관련 도메인 규칙 적용
 */
@Service
public class RentalImageDomainService {

    private final Map<AiImageType, RentalImageStrategy> rentalImageStrategies;

    public RentalImageDomainService(List<RentalImageStrategy> strategyList) {
        this.rentalImageStrategies = strategyList.stream()
                .collect(Collectors.toMap(
                        RentalImageStrategy::getImageType,
                        strategy -> strategy
                ));
    }

    public void processRentalImage(Rental rental, String imageUrl, String mimeType, AiImageType imageType) {
        RentalImageStrategy strategy = rentalImageStrategies.get(imageType);
        strategy.updateRentalImage(rental, imageUrl, mimeType);
    }

    public String createImagePath(String rentalId, AiImageType imageType) {
        return rentalImageStrategies.get(imageType).createImagePath(rentalId);
    }
}