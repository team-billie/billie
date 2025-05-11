package com.nextdoor.nextdoor.domain.chat.infrastructure.messaging;

import com.nextdoor.nextdoor.domain.chat.application.UnreadCounterService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.nextdoor.nextdoor.domain.chat.application.dto.ChatMessageDto;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ChatMessageRepository;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ConversationRepository;
import com.nextdoor.nextdoor.domain.chat.domain.Conversation;
import com.nextdoor.nextdoor.domain.chat.infrastructure.websocket.ChatWebSocketHandler;
//import com.nextdoor.nextdoor.domain.chat.application.NotificationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class ChatMessageConsumer {

    private final ChatMessageRepository    chatMessageRepository;
    private final ConversationRepository   conversationRepository;
    private final ChatWebSocketHandler     webSocketHandler;
    private final UnreadCounterService unreadCounterService;
//    private final NotificationFacade notificationFacade;

    /**
     * RabbitMQ로부터 메시지를 수신하여
     * 1) Cassandra 에 영구 저장
     * 2) Unread 카운트 증가
     * 3) WebSocket 연결된 상대에게 실시간 전달
     * 4) 알림 트리거
     */
    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receive(ChatMessage chatMessage) {
        log.debug("RabbitMQ로부터 메시지 수신 → {}", chatMessage);

        // 1) Cassandra에 저장
        chatMessageRepository.save(chatMessage);

        // 2) Unread 카운트 증가
        UUID convId = chatMessage.getKey().getConversationId();
        Conversation conv = conversationRepository.findById(convId)
                .orElseThrow(() -> new IllegalStateException("Conversation not found: " + convId));
        // 발신자(senderId) 제외한 상대 목록
        List<Long> recipients = conv.getParticipantIds().stream()
                .filter(id -> !id.equals(chatMessage.getSenderId()))
                .toList();
        // 실제 카운터 업데이트
        unreadCounterService.incrementUnread(convId, recipients);

        // 3) WebSocket 사용자에게 즉시 푸시할 DTO 생성
        ChatMessageDto dto = ChatMessageDto.builder()
                .conversationId(convId)
                .senderId       (chatMessage.getSenderId())
                .content        (chatMessage.getContent())
                .sentAt         (chatMessage.getKey().getSentAt())
                .build();

        // 4) WebSocket 전송
        recipients.forEach(target ->
                webSocketHandler.sendToUser(dto, target.toString())
        );

        // 5) 알림(푸시) 전송 (구현은 NotificationFacade 구현체에서 처리)
//        notificationFacade.notifyNewMessage(chatMessage);
    }
}
