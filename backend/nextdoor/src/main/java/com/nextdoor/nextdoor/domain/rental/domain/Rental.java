package com.nextdoor.nextdoor.domain.rental.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalId;

    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AiImage> aiImages = new ArrayList<>();

    @Column(name = "reservation_id", nullable = false)
    private Long reservationId;

    @Column(name = "rental_status", nullable = false)
    private String rentalStatus;

    @Column(name = "damage_analysis")
    private String damageAnalysis;

    public void saveAiImage(String imageUrl, String mimeType) {
        validateNotBlank(imageUrl, "imageUrl");
        validateNotBlank(mimeType, "mimeType");
        validateStatusForAdd();
        validateQuantityLimit();
        validateNoDuplicate(imageUrl);

        AiImage aiImage = AiImage.builder()
                .rental(this)
                .imageUrl(imageUrl)
                .mimeType(mimeType)
                .build();
        aiImages.add(aiImage);
    }

    private void validateNotBlank(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + "는 필수 값입니다.");
        }
    }

    private void validateStatusForAdd() {
        if (!"PAYMENT_PENDING".equals(this.rentalStatus)) {
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