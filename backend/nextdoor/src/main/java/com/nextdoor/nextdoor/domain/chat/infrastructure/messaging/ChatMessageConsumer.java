package com.nextdoor.nextdoor.domain.chat.infrastructure.messaging;

import com.nextdoor.nextdoor.domain.chat.config.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

/**
 * RabbitMQ에서 페이로드 수신 후 WebSocket 구독자에게 전달
 */
@Component
@RequiredArgsConstructor
public class ChatMessageConsumer {

    private final SimpMessagingTemplate messagingTemplate;

    @RabbitListener(queues = RabbitMQConfig.CHAT_QUEUE)
    public void receive(ChatMessagePayload payload) {
        // "/topic/rooms/{roomId}" 로 구독 중인 클라이언트에게 푸시
        messagingTemplate.convertAndSend(
                "/topic/rooms/" + payload.getRoomId(),
                payload
        );
    }
}
