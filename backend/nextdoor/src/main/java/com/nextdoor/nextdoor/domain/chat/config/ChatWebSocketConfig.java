package com.nextdoor.nextdoor.domain.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.*;

/**
 * STOMP over WebSocket 설정: 엔드포인트와 브로커를 등록
 */
@Configuration
@EnableWebSocketMessageBroker
public class ChatWebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 1) 메시지 브로커(구독) 설정: /topic prefix, heartbeat, scheduler
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry
                .enableSimpleBroker("/topic")
                .setHeartbeatValue(new long[]{10_000, 10_000})
                .setTaskScheduler(heartBeatScheduler());
        registry.setApplicationDestinationPrefixes("/app");
    }

    /**
     * 2) STOMP 엔드포인트 등록:
     *    - 순수 WebSocket(ws://) 용
     *    - SockJS(ws-fallback) 용
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/ws-chat")  // plain WebSocket
                .setAllowedOriginPatterns(
                        "https://k12e205.p.ssafy.io",
                        "http://localhost:3000"
                );

        registry
                .addEndpoint("/ws-chat")  // SockJS fallback
                .setAllowedOriginPatterns(
                        "https://k12e205.p.ssafy.io",
                        "http://localhost:3000"
                )
                .withSockJS();
    }

    /**
     * 3) heartbeat 처리를 위한 스케줄러
     */
    @Bean
    public ThreadPoolTaskScheduler heartBeatScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setThreadNamePrefix("ws-heartbeat-thread-");
        scheduler.initialize();
        return scheduler;
    }
}
