package com.nextdoor.nextdoor.domain.fintech.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "regist_account",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_primary_account_per_user",
                columnNames = {"user_id", "is_primary"}
        )
)
@Data @NoArgsConstructor @AllArgsConstructor @Builder
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class RegistAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "regist_account_id")
    private Long id;
    //↳ 기존 userId 컬럼을 지우고
    // @Column(name = "user_id", nullable = false)
    // private Long userId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_key", nullable = false)
    @JsonIgnore
    private FintechUser user;

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
    private Long balance;

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;
}