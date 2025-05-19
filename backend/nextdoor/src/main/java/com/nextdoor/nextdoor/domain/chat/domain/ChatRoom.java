package com.nextdoor.nextdoor.domain.chat.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 채팅방 엔티티: 멤버와 메시지를 묶는 최상위 도메인
 */
@Entity
@Table(name = "chat_room")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMember> members;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> messages;

    @Builder
    public ChatRoom(List<ChatMember> members) {
        this.members = members;
        this.members.forEach(m -> m.setChatRoom(this));
    }
}
