package com.nextdoor.nextdoor.domain.chat.application;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

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
     * conversationId = UUID
     * @param 두 명의 사용자 ID (owner, renter)
     */
    @Transactional
    public Conversation createConversation(Long ownerId, Long renterId, Long postId) {
        Conversation conv = Conversation.builder()
                .conversationId(UUID.randomUUID())
                .ownerId(ownerId)
                .renterId(renterId)
                .createdAt(Instant.now())
                .postId(postId)
                .build();
        return conversationRepository.save(conv);
    }
}
