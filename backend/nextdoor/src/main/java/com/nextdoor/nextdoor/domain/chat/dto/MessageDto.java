package com.nextdoor.nextdoor.domain.chat.dto;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 메시지 응답용 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDto {
    private Long messageId;
    private Long senderId;
    private String content;
    private LocalDateTime sentAt;
    private boolean deleted;

    public static MessageDto from(ChatMessage msg) {
        return MessageDto.builder()
                .messageId(msg.getId())
                .senderId(msg.getSenderId())
                .content(msg.getContent())
                .sentAt(msg.getSentAt())
                .deleted(msg.isDeleted())
                .build();
    }
}
