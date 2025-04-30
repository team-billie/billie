package com.nextdoor.nextdoor.domain.rental.domain;

import com.nextdoor.nextdoor.domain.rental.service.dto.AiImageDto;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

@Entity
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalId;

    @OneToOne(mappedBy = "ai_image")
    private AiImage aiImage;

    @Column(name = "reservation_id", nullable = false)
    private Long reservationId;

    @Column(name = "rental_status", nullable = false)
    private String rentalStatus;

    @Column(name = "damage_analysis")
    private String damageAnalysis;

    public void uploadAiImage(AiImageDto aiImageDto) {
        this.aiImage = AiImage.builder()
                .imageUrl(aiImageDto.getImageUrl())
                .mimeType(aiImageDto.getMimeType())
                .build();
    }
}