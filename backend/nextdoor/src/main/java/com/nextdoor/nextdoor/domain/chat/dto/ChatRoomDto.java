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
    private Long postId;
    private Long ownerId;
    private Long renterId;
    private String lastMessage;
    private LocalDateTime lastSentAt;
    private long unreadCount;

    public static ChatRoomDto from(
            ChatRoom room,
            String lastMsg,
            LocalDateTime lastAt,
            long unread
    ) {
        return ChatRoomDto.builder()
                .roomId(room.getId())
                .postId(room.getPostId())
                .ownerId(room.getOwnerId())
                .renterId(room.getRenterId())
                .lastMessage(lastMsg)
                .lastSentAt(lastAt)
                .unreadCount(unread)
                .build();
    }
}