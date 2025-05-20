package com.nextdoor.nextdoor.domain.chat.infrastructure.messaging;

import lombok.*;

import java.time.LocalDateTime;

/**
 * RabbitMQ 전송용 메시지 페이로드
 */
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ChatMessagePayload {
    private Long roomId;
    private Long messageId;
    private Long senderId;
    private String content;
    private LocalDateTime sentAt;
}
