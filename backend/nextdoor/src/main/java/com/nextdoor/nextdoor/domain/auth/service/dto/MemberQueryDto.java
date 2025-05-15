package com.nextdoor.nextdoor.domain.auth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberQueryDto {

    private Long id;
    private String uuid;
    private String email;
}
