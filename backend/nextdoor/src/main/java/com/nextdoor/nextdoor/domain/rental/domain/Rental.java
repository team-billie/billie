package com.nextdoor.nextdoor.domain.rental.domain;

import com.nextdoor.nextdoor.domain.rental.exception.InvalidAmountException;
import com.nextdoor.nextdoor.domain.rental.exception.InvalidRentalStatusException;
import com.nextdoor.nextdoor.domain.rental.exception.RentalImageUploadException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalId;

    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AiImage> aiImages = new ArrayList<>();

    @Column(name="reservation_id", nullable=false)
    private Long reservationId;

    @Enumerated(EnumType.STRING)
    @Column(name = "rental_status", nullable = false, length = 50)
    private RentalStatus rentalStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "rental_process", nullable = false, length = 50)
    private RentalProcess rentalProcess;

    @Lob
    @Column(name = "damage_analysis", columnDefinition = "TEXT")
    private String damageAnalysis;

    @Lob
    @Column(name = "compared_analysis", columnDefinition = "TEXT")
    private String comparedAnalysis;

    @Column(name = "deal_count")
    private Integer dealCount;

    @Column(name = "account_no", nullable = false, length = 30)
    private String accountNo;

    @Column(name = "bank_code", nullable = false, length = 10)
    private String bankCode;

    @Column(name = "deposit_id")
    private Long depositId;

    @Column(name = "final_amount")
    private BigDecimal finalAmount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public Rental(List<AiImage> aiImages, Long reservationId, RentalStatus rentalStatus, RentalProcess rentalProcess, String damageAnalysis, LocalDateTime createdAt, String accountNo, String bankCode, Long depositId) {
        this.aiImages = aiImages;
        this.reservationId = reservationId;
        this.rentalStatus = rentalStatus;
        this.rentalProcess = rentalProcess != null ? rentalProcess : getRentalProcessForStatus(rentalStatus);
        this.damageAnalysis = damageAnalysis;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
        this.dealCount = 0;
        this.accountNo = accountNo != null ? accountNo : "";
        this.bankCode = bankCode != null ? bankCode : "";
        this.depositId = depositId;
    }

    public static Rental createFromReservation(Long reservationId) {
        return Rental.builder()
                .reservationId(reservationId)
                .rentalStatus(RentalStatus.CREATED)
                .createdAt(LocalDateTime.now())
                .accountNo("")
                .bankCode("")
                .build();
    }

    public void processRemittanceRequest() {
        updateStatus(RentalStatus.REMITTANCE_REQUESTED);
    }

    public void processRemittanceCompletion() {
        if(rentalStatus != RentalStatus.BEFORE_PHOTO_ANALYZED){
            throw new InvalidRentalStatusException("결제 완료 처리가 불가능한 대여 상태입니다");
        }

        updateStatus(RentalStatus.REMITTANCE_COMPLETED);
    }

    public void processRentalPeriodEnd() {
        if(rentalStatus != RentalStatus.REMITTANCE_COMPLETED){
            throw new InvalidRentalStatusException("대여 기간 종료가 불가능한 대여 상태입니다");
        }

        updateStatus(RentalStatus.RENTAL_PERIOD_ENDED);
    }

    public void updateDamageAnalysis(String damageAnalysis) {
        this.damageAnalysis = damageAnalysis;
        updateStatus(RentalStatus.BEFORE_PHOTO_ANALYZED);
    }

    public void updateComparedAnalysis(String comparedAnalysis) {
        this.comparedAnalysis = comparedAnalysis;
    }

    public void processUpdateAccountInfo(String accountNo, String bankCode) {
        validateNotBlank(accountNo, "accountNo");
        validateNotBlank(bankCode, "bankCode");
        this.accountNo = accountNo;
        this.bankCode = bankCode;

        updateStatus(RentalStatus.REMITTANCE_REQUESTED);
    }

    public void processDepositCompletion(){
        if (rentalStatus != RentalStatus.BEFORE_AND_AFTER_COMPARED) {
            throw new InvalidRentalStatusException(this.rentalStatus.name() + ": 보증금을 처리가 불가능한 대여 상태입니다");
        }

        updateDealCount();
        updateStatus(RentalStatus.RENTAL_COMPLETED);
    }

    public void updateDealCount() {
        this.dealCount = dealCount + 1;
    }

    public void updateDepositId(Long depositId) {
        this.depositId = depositId;
    }

    public void updateFinalAmount(BigDecimal amount) {
        validateAmount(amount);
        this.finalAmount = amount;
    }

    public void validateRemittancePendingState() {
        if (this.rentalStatus != RentalStatus.REMITTANCE_REQUESTED) {
            throw new InvalidRentalStatusException("송금 대기 상태가 아닙니다.");
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

    private void validateQuantityLimit() {
        if (aiImages.size() >= 10) {
            throw new RentalImageUploadException("최대 등록 가능 이미지 수를 초과했습니다.");
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
            case BEFORE_PHOTO_ANALYZED:
            case REMITTANCE_REQUESTED:
            case CANCELLED:
                return RentalProcess.BEFORE_RENTAL;
            case REMITTANCE_COMPLETED:
                return RentalProcess.RENTAL_IN_ACTIVE;
            case RENTAL_PERIOD_ENDED:
            case BEFORE_AND_AFTER_COMPARED:
            case DEPOSIT_REQUESTED:
                return RentalProcess.RETURNED;
            case RENTAL_COMPLETED:
                return RentalProcess.RENTAL_COMPLETED;
            default:
                return RentalProcess.BEFORE_RENTAL;
        }
    }
}
