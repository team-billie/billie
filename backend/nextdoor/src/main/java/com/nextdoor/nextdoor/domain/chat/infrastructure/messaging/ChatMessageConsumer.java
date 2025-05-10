package com.nextdoor.nextdoor.domain.chat.infrastructure.messaging;

import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ChatMessageRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
//import com.nextdoor.nextdoor.domain.chat.application.NotificationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ChatMessageConsumer {

    private final ChatMessageRepository chatMessageRepository;
//    private final NotificationFacade notificationFacade;

    /**
     * RabbitMQ로부터 메시지를 수신하여
     * 1) 영구 저장(Cassandra)
     * 2) 알림 전송 트리거
     */
    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receive(ChatMessage chatMessage) {
        log.debug("RabbitMQ로부터 메시지 수신 → {}", chatMessage);

        // 1) Cassandra에 저장
        chatMessageRepository.save(chatMessage);

        // 2) 알림(푸시) 전송 (구현은 NotificationFacade 구현체에서 처리)
//        notificationFacade.notifyNewMessage(chatMessage);
    }
}
