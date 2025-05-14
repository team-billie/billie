package com.nextdoor.nextdoor.domain.chat.infrastructure.websocket;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextdoor.nextdoor.domain.chat.application.ChatService;
import com.nextdoor.nextdoor.domain.chat.application.dto.ChatMessageDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@Component
@RequiredArgsConstructor
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    /**
     * 세션을 {userId:session} 맵에 보관 → 메시지 브로드캐스트할 때 사용
     * (간단 예시: 1:1 채팅이므로 두 사용자의 세션만 저장하면 됩니다)
     */
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 예: ws://…/ws/chat?user=123&conv=abc
        String userId = getParam(session, "userId");
        sessions.put(userId, session);
        log.debug("WS 연결: user={} 세션등록 (total={})", userId, sessions.size());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 클라이언트로부터 받은 JSON 페이로드를 DTO로 역직렬화
        ChatMessageDto dto = objectMapper.readValue(message.getPayload(), ChatMessageDto.class);

        // 1) 메시지 발행(RabbitMQ → Consumer → Cassandra 저장 + 알림)
        chatService.sendMessage(dto);

        // 2) 발신자에게 바로 ACK 응답 (원한다면)
        session.sendMessage(new TextMessage(
                objectMapper.writeValueAsString(
                        ChatMessageDto.builder()
                                .conversationId(dto.getConversationId())
                                .senderId(dto.getSenderId())
                                .content(dto.getContent())
                                .sentAt(dto.getSentAt())
                                .build()
                )
        ));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // 세션 맵에서 제거
        sessions.values().removeIf(s -> s.getId().equals(session.getId()));
        log.debug("WS 종료: 세션 해제 (total={})", sessions.size());
    }

    private String getParam(WebSocketSession session, String name) {
        return session.getUri()
                .getQuery()
                .lines()
                .filter(p -> p.startsWith(name + "="))
                .map(p -> p.substring(p.indexOf('=') + 1))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(name + " 파라미터 누락"));
    }

    /**
     * Consumer 로부터 전달된 새로운 메시지를 WebSocket 사용자에게 전송
     * -> ChatMessageConsumer 에서 호출하도록 추가빈으로 등록해야함
     */
    public void sendToUser(ChatMessageDto dto, String targetUserId) {
        WebSocketSession ws = sessions.get(targetUserId);
        if (ws != null && ws.isOpen()) {
            try {
                ws.sendMessage(new TextMessage(objectMapper.writeValueAsString(dto)));
            } catch (Exception e) {
                log.error("WS 전송 실패: user={} dto={}", targetUserId, dto, e);
            }
        }
    }
}
