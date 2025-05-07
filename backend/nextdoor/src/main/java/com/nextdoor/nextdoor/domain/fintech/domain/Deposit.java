package com.nextdoor.nextdoor.domain.fintech.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "deposit")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//보증금 처리를 위한 별도 테이블. Rental(또는 Chat) 테이블의 PK를 참조해 예치·반환 이력을 관리
public class Deposit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long rentalId;
    private Long accountId;
    private Integer amount;

    @Enumerated(EnumType.STRING)
    private DepositStatus status;

    private LocalDateTime heldAt;
    private LocalDateTime returnedAt;
}