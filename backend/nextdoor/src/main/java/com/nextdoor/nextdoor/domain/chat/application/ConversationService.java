package com.nextdoor.nextdoor.domain.chat.application;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nextdoor.nextdoor.domain.chat.domain.Conversation;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ConversationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;

    /**
     * 새로운 1:1 채팅방을 생성합니다.
     * @param conversationId 클라이언트가 주는 ID (Long)
     * @param participantIds 두 명의 사용자 ID (owner, renter)
     */
    @Transactional
    public Conversation createConversation(Long conversationId, List<Long> participantIds) {
        Conversation conv = Conversation.builder()
                .conversationId(conversationId)
                .participantIds(participantIds)
                .createdAt(Instant.now())
                .build();
        return conversationRepository.save(conv);
    }
}
