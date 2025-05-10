package com.nextdoor.nextdoor.domain.fintech.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "account")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Account {
    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_no", nullable = false, length = 30)
    private String accountNo;

    @Column(name = "bank_code", nullable = false, length = 10)
    private String bankCode;

    @Column(nullable = false)
    private Integer balance;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_key", nullable = false)
    @JsonIgnore
    private FintechUser user;
}