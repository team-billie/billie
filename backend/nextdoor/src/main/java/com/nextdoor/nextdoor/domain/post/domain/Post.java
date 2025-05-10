package com.nextdoor.nextdoor.domain.post.domain;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends TimestampedEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(name = "title", length = 255)
    private String title;

    @Column(length = 1000)
    private String content;

    @Column(name = "rental_fee")
    private Long rentalFee;

    @Column(name = "deposit")
    private Long deposit;

    @Column(name = "address")
    private String address;

    @Column(name = "location", columnDefinition = "POINT")
    private String location;

    @Column(name = "product_image", length = 255)
    private String productImage;

    @Column(name = "category", length = 255)
    private String category;

    @Column(name = "author_id")
    private Long authorId;

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PostLike> likes = new HashSet<>();

    public void addLike(Long memberId) {
        boolean alreadyLiked = this.likes.stream()
                .anyMatch(like -> like.getMemberId().equals(memberId));

        if (!alreadyLiked) {
            PostLike like = new PostLike(this, memberId);
            this.likes.add(like);
        }
    }

    public void removeLike(Long memberId) {
        this.likes.removeIf(like -> like.getMemberId().equals(memberId));
    }

    public int getLikeCount() {
        return this.likes.size();
    }

    @Builder
    public Post(Long id, String title, String content, Long rentalFee, Long deposit, String address, String location, String productImage, String category, Long authorId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.rentalFee = rentalFee;
        this.deposit = deposit;
        this.address = address;
        this.location = location;
        this.productImage = productImage;
        this.category = category;
        this.authorId = authorId;
    }
}