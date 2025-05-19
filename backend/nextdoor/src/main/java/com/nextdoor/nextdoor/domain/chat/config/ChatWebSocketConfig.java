package com.nextdoor.nextdoor.domain.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

/**
 * STOMP over WebSocket 설정: 엔드포인트와 브로커를 등록
 */
@Configuration
@EnableWebSocketMessageBroker
public class ChatWebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/ws-chat")                   // 클라이언트가 연결할 엔드포인트
                .setAllowedOriginPatterns("*")             // CORS 허용 (운영 시 도메인 제한 권장)
                .withSockJS();                             // SockJS fallback 지원
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");  // @MessageMapping prefix
        registry.enableSimpleBroker("/topic");               // 구독(prefix) 브로커
    }
}
