package com.nextdoor.nextdoor.domain.chat.infrastructure.messaging;

import com.nextdoor.nextdoor.domain.chat.config.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

/**
 * RabbitMQ로 ChatMessagePayload 발행
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ChatMessageProducer {

    private final RabbitTemplate rabbitTemplate;

    public void publish(ChatMessagePayload payload) {
        log.debug("RabbitMQ로 메시지 발행 → {}", payload);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.CHAT_EXCHANGE,
                RabbitMQConfig.CHAT_ROUTING_KEY,
                payload
        );
    }
}
