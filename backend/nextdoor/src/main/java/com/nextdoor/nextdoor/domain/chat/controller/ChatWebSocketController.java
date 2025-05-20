package com.nextdoor.nextdoor.domain.chat.controller;

import com.nextdoor.nextdoor.domain.chat.service.MessageService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

/**
 * STOMP 메시지 매핑 컨트롤러: "/app/chat.send" 로 들어온 메시지를 처리
 */
@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {
    private final MessageService messageService;

    @MessageMapping("/chat.send")
    public void processMessage(ChatMessageRequest request) {
        // 메시지 저장 및 RabbitMQ 퍼블리시
        messageService.sendMessage(
                request.getRoomId(),
                request.getSenderId(),
                request.getContent()
        );
    }

    @Data
    public static class ChatMessageRequest {
        private Long roomId;
        private Long senderId;
        private String content;
    }
}
