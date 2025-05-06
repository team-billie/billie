package com.nextdoor.nextdoor.domain.fintech.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "account")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//단일 사용자가 여러 계좌를 가질 수 있도록 userKey와 1:N 매핑
public class Account {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNumber;
    private String bankCode;
    private String accountName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_key")
    private FintechUser user;

    private LocalDateTime createdAt;
}