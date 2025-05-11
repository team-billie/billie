package com.nextdoor.nextdoor.domain.fintech.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "fintech_user")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class FintechUser {
    @Id
    @Column(name = "user_key", length = 36)
    private String userKey;

    @Column(name = "user_id", nullable = false)
    private Long userId;      // user 생기면 private User userId 로 변경해도될듯

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}