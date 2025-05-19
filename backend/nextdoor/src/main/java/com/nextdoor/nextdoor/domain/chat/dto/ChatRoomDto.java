package com.nextdoor.nextdoor.domain.chat.dto;

import com.nextdoor.nextdoor.domain.chat.domain.ChatRoom;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 채팅방 목록 조회 응답용 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDto {
    private Long roomId;
    private String lastMessage;
    private LocalDateTime lastSentAt;
    private long unreadCount;

    public static ChatRoomDto of(
            ChatRoom room,
            String lastMessage,
            LocalDateTime lastSentAt,
            long unreadCount
    ) {
        return ChatRoomDto.builder()
                .roomId(room.getId())
                .lastMessage(lastMessage)
                .lastSentAt(lastSentAt)
                .unreadCount(unreadCount)
                .build();
    }
}
