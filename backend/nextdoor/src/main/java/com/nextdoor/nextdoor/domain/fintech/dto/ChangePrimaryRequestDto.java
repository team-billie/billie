package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePrimaryRequestDto {
    private String userKey;           // SSAFY userKey
}