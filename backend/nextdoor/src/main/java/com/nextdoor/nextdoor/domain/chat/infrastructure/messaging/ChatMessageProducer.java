package com.nextdoor.nextdoor.domain.chat.infrastructure.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ChatMessageProducer {

    private final RabbitTemplate rabbitTemplate;

    /**
     * 메시지를 RabbitMQ로 발행합니다.
     */
    public void send(ChatMessage chatMessage) {
        log.debug("RabbitMQ로 메시지 발행 → {}", chatMessage);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.ROUTING_KEY,
                chatMessage
        );
    }
}
