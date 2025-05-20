package com.nextdoor.nextdoor.domain.chat.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 메시지 엔티티: 실제 주고받은 메시지 내용 저장
 */
@Entity
@Table(name = "chat_message")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;
    private String content;
    private LocalDateTime sentAt = LocalDateTime.now();
    private boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    @Builder
    public ChatMessage(ChatRoom chatRoom, Long senderId, String content) {
        this.chatRoom = chatRoom;
        this.senderId = senderId;
        this.content = content;
    }

    /** 삭제(회수) 처리 */
    public void markDeleted() {
        this.deleted = true;
        this.content = "회수된 메시지";
    }
}
