package com.nextdoor.nextdoor.domain.post.domain;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(name = "title", length = 255)
    private String title;

    @Column(length = 1000)
    private String content;

    @Column(name = "rental_fee")
    private Long rentalFee;

    @Column(name = "deposit")
    private Long deposit;

    @Column(name = "location", columnDefinition = "POINT")
    private String location;

    @Column(name = "product_image", length = 255)
    private String productImage;

    @Column(name = "category", length = 255)
    private String category;

    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public Post(Long postId, String title, String content, Long rentalFee, Long deposit, String location, String productImage, String category, Long authorId, LocalDateTime createdAt) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.rentalFee = rentalFee;
        this.deposit = deposit;
        this.location = location;
        this.productImage = productImage;
        this.category = category;
        this.authorId = authorId;
        this.createdAt = createdAt;
    }
}