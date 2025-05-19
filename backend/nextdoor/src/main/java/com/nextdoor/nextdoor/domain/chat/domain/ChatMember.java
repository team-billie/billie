package com.nextdoor.nextdoor.domain.chat.domain;

import jakarta.persistence.*;
import lombok.*;

/**
 * 채팅방–사용자 매핑 엔티티: 누가 어떤 방에 속해있는지 관리
 */
@Entity
@Table(name = "chat_member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMember {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // 로그인한 사용자의 PK

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    public ChatMember(Long userId) {
        this.userId = userId;
    }

    void setChatRoom(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }
}
