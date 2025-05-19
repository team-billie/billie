package com.nextdoor.nextdoor.domain.chat.port;

import com.nextdoor.nextdoor.domain.chat.dto.MemberDto;

import java.util.Optional;

/**
 * Chat domain's port for querying member information
 */
public interface ChatMemberQueryPort {

    /**
     * Find member information by ID
     * @param memberId the ID of the member to find
     * @return Optional containing member information if found
     */
    Optional<MemberDto> findById(Long memberId);
}
