package com.nextdoor.nextdoor.domain.rental.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccountResponse {
    private Long rentalId;
    private String accountNo;
    private String bankCode;
}