package com.nextdoor.nextdoor.domain.fintech.dto;

import com.nextdoor.nextdoor.domain.fintech.domain.DepositStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data @AllArgsConstructor @NoArgsConstructor
@Builder
public class DepositResponseDto {
    private Long id;
    private Long rentalId;
    private Integer amount;
    private DepositStatus status;
    private Integer deductedAmount;
    private LocalDateTime heldAt;
    private LocalDateTime returnedAt;
    // 계좌 정보
    private String accountNo;
    private String bankCode;
}
