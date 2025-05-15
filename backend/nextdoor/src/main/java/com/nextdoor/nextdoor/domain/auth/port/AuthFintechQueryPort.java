package com.nextdoor.nextdoor.domain.auth.port;

import com.nextdoor.nextdoor.domain.auth.service.dto.AuthFintechQueryDto;

public interface AuthFintechQueryPort {

    AuthFintechQueryDto findByUserId(Long userId);
}
