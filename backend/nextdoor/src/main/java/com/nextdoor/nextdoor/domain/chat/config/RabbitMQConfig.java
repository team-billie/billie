package com.nextdoor.nextdoor.domain.chat.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * RabbitMQ 교환기/큐/바인딩 및 메시지 컨버터 설정
 */
@Configuration
public class RabbitMQConfig {

    public static final String CHAT_EXCHANGE   = "chat.exchange";
    public static final String CHAT_QUEUE      = "chat.queue";
    public static final String CHAT_ROUTING_KEY= "chat.key";

    @Bean
    public DirectExchange chatExchange() {
        return new DirectExchange(CHAT_EXCHANGE);
    }

    @Bean
    public Queue chatQueue() {
        return QueueBuilder.durable(CHAT_QUEUE).build();
    }

    @Bean
    public Binding chatBinding(Queue chatQueue, DirectExchange chatExchange) {
        return BindingBuilder
                .bind(chatQueue)
                .to(chatExchange)
                .with(CHAT_ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory cf,
            Jackson2JsonMessageConverter converter
    ) {
        RabbitTemplate rt = new RabbitTemplate(cf);
        rt.setMessageConverter(converter);
        return rt;
    }
}
