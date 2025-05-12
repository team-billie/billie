package com.nextdoor.nextdoor.domain.chat.application.dto;

import java.util.List;

import lombok.*;

/**
 * 채팅방 생성 요청 페이로드
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateConversationRequest {
    /** 참여자 리스트 (2명) */
    private List<Long> participantIds;
    private Long postId;
}
