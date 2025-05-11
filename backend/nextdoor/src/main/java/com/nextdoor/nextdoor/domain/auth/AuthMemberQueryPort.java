package com.nextdoor.nextdoor.domain.auth;

import com.nextdoor.nextdoor.domain.auth.service.dto.MemberQueryDto;

import java.util.Optional;

public interface AuthMemberQueryPort {

    Optional<MemberQueryDto> findByNickname(String nickname);
}
