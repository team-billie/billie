package com.nextdoor.nextdoor.domain.chat.application;

import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nextdoor.nextdoor.domain.chat.application.dto.ChatMessageDto;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessageKey;
import com.nextdoor.nextdoor.domain.chat.domain.Conversation;
import com.nextdoor.nextdoor.domain.chat.infrastructure.messaging.ChatMessageProducer;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ConversationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final ChatMessageProducer producer;
//    private final NotificationFacade notificationFacade;

    /**
     * 1. 대화방 참가자 검증
     * 2. ChatMessage 엔티티 생성(메시지 전송을 위한)
     * 3. RabbitMQ로 발행 → Consumer에서 저장/푸시
     * 4. (즉시) 알림 트리거
     */
    @Transactional
    public void sendMessage(ChatMessageDto dto) {
        // 1) Conversation 존재 및 참여자 검증
        Conversation conv = conversationRepository.findById(dto.getConversationId())
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found: " + dto.getConversationId()));
        if (!conv.getParticipantIds().contains(dto.getSenderId())) {
            throw new IllegalArgumentException("Sender not a participant: " + dto.getSenderId());
        }

        // 2) 엔티티로 변환
        Instant now = dto.getSentAt() != null ? dto.getSentAt() : Instant.now();
        ChatMessageKey key = ChatMessageKey.builder()
                .conversationId(dto.getConversationId())
                .sentAt(now)
                .messageId(UUID.randomUUID())
                .build();

        ChatMessage msg = ChatMessage.builder()
                .key(key)
                .senderId(dto.getSenderId())
                .content(dto.getContent())
                .read(false)
                .build();

        // 3) RabbitMQ 발행
        producer.send(msg);

//        // 4) 즉시 알림 트리거 (오프라인용)
//        notificationFacade.notifyNewMessage(
//                dto.getConversationId(),
//                dto.getSenderId(),
//                dto.getContent()
//        );
    }
}
