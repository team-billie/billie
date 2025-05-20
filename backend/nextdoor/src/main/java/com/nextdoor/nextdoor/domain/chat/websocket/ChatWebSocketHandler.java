package com.nextdoor.nextdoor.domain.chat.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * 저수준 WebSocket 핸들러: 세션 관리 및 간단 브로드캐스트 예시
 */
@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    // 연결된 세션 보관
    private final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 들어온 메시지를 모든 세션에 브로드캐스트
        for (WebSocketSession ws : sessions) {
            if (ws.isOpen()) {
                ws.sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}
