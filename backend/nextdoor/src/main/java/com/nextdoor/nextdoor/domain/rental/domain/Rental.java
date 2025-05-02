package com.nextdoor.nextdoor.domain.rental.domain;

import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.enums.RentalStatus;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Column(name = "damage_analysis")
    private String damageAnalysis;

    @Builder
    public Rental(List<AiImage> aiImages, Long reservationId, RentalStatus rentalStatus, String damageAnalysis) {
        this.aiImages = aiImages;
        this.reservationId = reservationId;
        this.rentalStatus = rentalStatus;
        this.damageAnalysis = damageAnalysis;
    }

    public static Rental createFromReservation(Long reservationId) {
        Rental r = new Rental();
        r.reservationId = reservationId;
        r.rentalStatus = RentalStatus.CREATED;
        return r;
    }

    public void requestRemittance(BigDecimal amount) {
        validateRemittancePendingState();
        validateAmount(amount);
        this.rentalStatus = RentalStatus.REMITTANCE_REQUESTED;
    }

    public void validateRemittancePendingState() {
        if (!Objects.equals(this.rentalStatus, RentalStatus.REMITTANCE_REQUESTED.name())) {
            throw new IllegalStateException("송금 대기 상태가 아닙니다.");
        }
    }

    private void validateAmount(BigDecimal amount) {
        //TODO : 금액 범위 검증
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
}