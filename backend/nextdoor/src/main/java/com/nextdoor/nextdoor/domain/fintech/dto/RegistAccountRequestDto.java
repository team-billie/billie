package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// 계좌 등록 Dto
public class RegistAccountRequestDto {
    private String userKey;      // SSAFY userKey
    private String accountNo;    // SSAFY 계좌번호
    private String bankCode;   // 은행 코드
    private String alias;        // 사용자 지정 별칭 (optional)
}