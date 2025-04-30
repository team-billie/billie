package com.nextdoor.nextdoor.domain.rental.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ai_image")
@AllArgsConstructor
@NoArgsConstructor
public class AiImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rental_id")
    private Rental rental;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "mime_type", nullable = false)
    private String mimeType;

    @Builder
    public AiImage(Rental rental, String imageUrl, String mimeType) {
        this.rental = rental;
        this.imageUrl = imageUrl;
        this.mimeType = mimeType;
    }
}



