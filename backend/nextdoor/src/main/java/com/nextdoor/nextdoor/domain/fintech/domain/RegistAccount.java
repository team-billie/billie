package com.nextdoor.nextdoor.domain.fintech.domain;

import com.nextdoor.nextdoor.domain.user.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "regist_account",
        uniqueConstraints = @UniqueConstraint(name = "uq_primary_account_per_user",
                columnNames = {"user_id"},
                /* partial index cannot be expressed in JPA, enforce in application */
                columnDefinition = "user_id WHERE is_primary = true"))
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class RegistAccount {
    @Id
    @Column(name = "regist_account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "user_id", nullable = false)
//    private Long user; // 나중에 User user로 바꾸기

    // userId만 칼럼으로 저장 (ManyToOne 제거)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false, length = 20)
    private RegistAccountType accountType; // BILI_PAY or EXTERNAL

    @Column(length = 50)
    private String alias;

    @Column(name = "is_primary", nullable = false)
    private Boolean primary;

    @Column(nullable = false)
    private Integer balance;

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;
}