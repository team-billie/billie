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
    /** 상대 사용자 닉네임 */
    private String otherNickname;
    /** 상대 사용자 프로필 이미지 URL */
    private String otherProfileImageUrl;
    /** 채팅 대상 게시물 대표 이미지 URL */
    private String postImageUrl;
    /** 게시글 제목 */
    private String title;
    /** 대여료 */
    private Long rentalFee;
    /** 보증금 */
    private Long deposit;
    /** 채팅방 상태 (예약중, 거래중, 상태없음) */
    private String chatStatus;

    public static ChatRoomDto from(
            ChatRoom room,
            String lastMsg,
            LocalDateTime lastAt,
            long unread,
            String otherNickname,
            String otherProfileImageUrl,
            String postImageUrl,
            String title,
            Long rentalFee,
            Long deposit,
            String chatStatus
    ) {
        return ChatRoomDto.builder()
                .roomId(room.getId())
                .postId(room.getPostId())
                .ownerId(room.getOwnerId())
                .renterId(room.getRenterId())
                .lastMessage(lastMsg)
                .lastSentAt(lastAt)
                .unreadCount(unread)
                .otherNickname(otherNickname)
                .otherProfileImageUrl(otherProfileImageUrl)
                .postImageUrl(postImageUrl)
                .title(title)
                .rentalFee(rentalFee)
                .deposit(deposit)
                .chatStatus(chatStatus)
                .build();
    }
}