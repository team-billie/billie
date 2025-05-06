package com.nextdoor.nextdoor.domain.rental.domain;

import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.enums.RentalProcess;
import com.nextdoor.nextdoor.domain.rental.enums.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.exception.InvalidAmountException;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@RequiredArgsConstructor
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalId;

    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AiImage> aiImages = new ArrayList<>();

    @Column(name="reservation_id", nullable=false, updatable=false, insertable=false)
    private Long reservationId;

    @Enumerated(EnumType.STRING)
    @Column(name = "rental_status", nullable = false)
    private RentalStatus rentalStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "rental_process", nullable = false)
    private RentalProcess rentalProcess;

    @Column(name = "damage_analysis")
    private String damageAnalysis;

    @Builder
    public Rental(List<AiImage> aiImages, Long reservationId, RentalStatus rentalStatus, RentalProcess rentalProcess, String damageAnalysis) {
        this.aiImages = aiImages;
        this.reservationId = reservationId;
        this.rentalStatus = rentalStatus;
        this.rentalProcess = rentalProcess != null ? rentalProcess : getRentalProcessForStatus(rentalStatus);
        this.damageAnalysis = damageAnalysis;
    }

    public static Rental createFromReservation(Long reservationId) {
        Rental r = new Rental();
        r.reservationId = reservationId;
        r.rentalStatus = RentalStatus.CREATED;
        r.rentalProcess = RentalProcess.BEFORE_RENTAL;
        return r;
    }

    public void requestRemittance(BigDecimal amount) {
        validateRemittancePendingState();
        validateAmount(amount);
        updateStatus(RentalStatus.REMITTANCE_REQUESTED);
    }

    public void processAfterImageRegistration(BigDecimal depositAmount) {
        if (depositAmount != null && depositAmount.compareTo(BigDecimal.ZERO) > 0) {
            updateStatus(RentalStatus.AFTER_PHOTO_REGISTERED);
        } else {
            updateStatus(RentalStatus.RENTAL_COMPLETED);
        }
    }

    public void processDepositCompletion(){
        if(rentalStatus != RentalStatus.DEPOSIT_REQUESTED){
            throw new IllegalStateException("보증금을 처리할 수 있는 상태가 아닙니다");
        }

        updateStatus(RentalStatus.RENTAL_COMPLETED);
    }

    public void validateRemittancePendingState() {
        if (this.rentalStatus != RentalStatus.REMITTANCE_REQUESTED) {
            throw new IllegalStateException("송금 대기 상태가 아닙니다.");
        }
    }

    private void validateAmount(BigDecimal amount) {
        if (amount == null) {
            throw new InvalidAmountException("송금 금액은 필수입니다.");
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidAmountException("송금 금액은 0보다 커야 합니다.");
        }
    }

    public void saveAiImage(AiImageType imageType, String imageUrl, String mimeType) {
        validateNotBlank(imageUrl, "imageUrl");
        validateNotBlank(mimeType, "mimeType");
        validateQuantityLimit();
        validateNoDuplicate(imageUrl);

        AiImage aiImage = AiImage.builder()
                .rental(this)
                .type(imageType)
                .imageUrl(imageUrl)
                .mimeType(mimeType)
                .build();
        aiImages.add(aiImage);
    }

    public void updateStatus(RentalStatus rentalStatus){
        this.rentalStatus = rentalStatus;
        this.rentalProcess = getRentalProcessForStatus(rentalStatus);
    }

    private void validateNotBlank(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + "는 필수 값입니다.");
        }
    }

    private void validateStatusForAddImage() {
        if (!RentalStatus.REMITTANCE_REQUESTED.equals(this.rentalStatus)) {
            throw new IllegalStateException(
                    "현재 상태(" + this.rentalStatus + ")에서는 Before 이미지 등록이 불가합니다."
            );
        }
    }

    private void validateQuantityLimit() {
        if (aiImages.size() >= 5) {
            throw new IllegalStateException("최대 등록 가능 이미지 수를 초과했습니다.");
        }
    }

    private void validateNoDuplicate(String imageUrl) {
        boolean exists = aiImages.stream()
                .anyMatch(img -> img.getImageUrl().equals(imageUrl));
        if (exists) {
            throw new IllegalArgumentException("이미 등록된 이미지 URL입니다: " + imageUrl);
        }
    }

    private RentalProcess getRentalProcessForStatus(RentalStatus status) {
        if (status == null) {
            return RentalProcess.BEFORE_RENTAL;
        }

        switch (status) {
            case CREATED:
            case BEFORE_PHOTO_REGISTERED:
            case REMITTANCE_REQUESTED:
            case CANCELLED:
                return RentalProcess.BEFORE_RENTAL;
            case REMITTANCE_CONFIRMED:
                return RentalProcess.RENTAL_IN_ACTIVE;
            case RENTAL_PERIOD_ENDED:
            case AFTER_PHOTO_REGISTERED:
            case DEPOSIT_REQUESTED:
                return RentalProcess.RETURNED;
            case RENTAL_COMPLETED:
                return RentalProcess.RENTAL_COMPLETED;
            default:
                return RentalProcess.BEFORE_RENTAL;
        }
    }
}
