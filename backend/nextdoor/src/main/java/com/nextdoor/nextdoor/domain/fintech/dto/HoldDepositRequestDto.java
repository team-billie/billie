package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

//보증금 보관 Dto
@Data
public class HoldDepositRequestDto {
    private String userKey;
    private Long rentalId;
    private String accountNo;
    private int amount;
}