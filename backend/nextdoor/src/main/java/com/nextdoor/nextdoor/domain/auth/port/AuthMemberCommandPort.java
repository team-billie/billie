package com.nextdoor.nextdoor.domain.auth.port;

import com.nextdoor.nextdoor.domain.auth.service.dto.MemberCommandDto;
import com.nextdoor.nextdoor.domain.auth.service.dto.MemberQueryDto;

public interface AuthMemberCommandPort {

    MemberQueryDto save(MemberCommandDto command);
}
