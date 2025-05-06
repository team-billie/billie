package com.nextdoor.nextdoor.domain.reservation.service.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberDto {

    private Long memberId;
    private String name;
    private String profileImageUrl;
}
