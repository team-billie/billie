package com.nextdoor.nextdoor.domain.chat.websocket;

import org.slf4j.*;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.*;

/**
 * STOMP 연결/해제 이벤트 리스너 (로깅 등 처리)
 */
@Component
public class ChatWebSocketEventListener {

    private static final Logger log = LoggerFactory.getLogger(ChatWebSocketEventListener.class);

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("WebSocket connected: headers={}", event.getMessage().getHeaders());
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor h = StompHeaderAccessor.wrap(event.getMessage());
        log.info("WebSocket disconnected: sessionId={}", h.getSessionId());
    }
}
