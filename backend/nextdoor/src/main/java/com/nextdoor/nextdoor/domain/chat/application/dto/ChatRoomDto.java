package com.nextdoor.nextdoor.domain.chat.application.dto;

import java.time.Instant;
import java.util.UUID;

import lombok.*;

/**
 * 1:1 채팅방 목록 조회용 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDto {
    /** 채팅방 ID */
    private UUID conversationId;
    /** 마지막 메시지 내용 미리보기 */
    private String lastMessage;
    /** 마지막 메시지 전송 시각 */
    private Instant lastSentAt;
    /** 안 읽은 메시지 개수 (추후 구현) */
    private Long   unreadCount;
    /** 상대 사용자 닉네임 */
    private String otherNickname;
    /** 상대 사용자 프로필 이미지 URL */
    private String otherProfileImageUrl;
    /** 채팅 대상 게시물 대표 이미지 URL */
    private String postImageUrl;
}
