package com.nextdoor.nextdoor.domain.rental.controller.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccountRequest {
    private String accountNo;
    private String bankCode;
}