package com.nextdoor.nextdoor.domain.chat.application.dto;

import java.time.Instant;
import java.util.UUID;

import lombok.*;

/**
 * WebSocket 핸들러 ↔ ChatService ↔ Consumer 간에 주고받는 메시지 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    /** 대화방 식별자 */
    private UUID conversationId;
    /** 보낸 사람 ID */
    private Long senderId;
    /** 메시지 본문 */
    private String content;
    /** 전송 시각 */
    private Instant sentAt;
}
