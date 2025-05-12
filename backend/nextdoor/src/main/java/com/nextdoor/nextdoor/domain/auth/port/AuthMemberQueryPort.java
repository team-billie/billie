package com.nextdoor.nextdoor.domain.auth.port;

import com.nextdoor.nextdoor.domain.auth.service.dto.MemberQueryDto;

import java.util.Optional;

public interface AuthMemberQueryPort {

    Optional<MemberQueryDto> findByEmail(String email);
}
