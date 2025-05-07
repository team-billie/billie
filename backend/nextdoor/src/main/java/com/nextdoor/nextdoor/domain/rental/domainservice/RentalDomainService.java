package com.nextdoor.nextdoor.domain.rental.domainservice;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.exception.InvalidRenterIdException;
import com.nextdoor.nextdoor.domain.rental.service.dto.ReservationDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * 대여 관련 순수 도메인 로직을 처리하는 도메인 서비스
 * 엔티티나 값 객체에 자연스럽게 속하지 않는 비즈니스 규칙을 구현
 */
@Service
public class RentalDomainService {

    public void validateRentalForRemittance(Rental rental, Long renterId, ReservationDto reservation) {
        if (!reservation.getRenterId().equals(renterId)) {
            throw new InvalidRenterIdException("요청한 대여자 ID가 실제 대여자 ID와 일치하지 않습니다.");
        }
    }

    public void processAfterImageRegistration(Rental rental, BigDecimal depositAmount) {
        if (depositAmount != null && depositAmount.compareTo(BigDecimal.ZERO) > 0) {
            rental.updateStatus(RentalStatus.AFTER_PHOTO_REGISTERED);
        } else {
            rental.updateStatus(RentalStatus.RENTAL_COMPLETED);
        }
    }
}