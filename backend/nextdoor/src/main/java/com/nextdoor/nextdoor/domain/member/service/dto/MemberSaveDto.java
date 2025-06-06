package com.nextdoor.nextdoor.domain.member.service.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberSaveDto {

    private String authProvider;
    private String nickname;
    private String email;
}
