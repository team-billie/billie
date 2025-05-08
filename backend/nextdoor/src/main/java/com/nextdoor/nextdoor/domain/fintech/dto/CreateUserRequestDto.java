package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
//계정 생성 Dto
public class CreateUserRequestDto {
    private Long userId;
    private String ssafyApiEmail; //이걸로 ssafy api 호출할때 body에 해당하는 userId에 넣을거임
}