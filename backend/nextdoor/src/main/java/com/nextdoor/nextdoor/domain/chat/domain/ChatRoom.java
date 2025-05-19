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
@AllArgsConstructor
@Builder
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 해당 방을 연 게시글 ID */
    @Column(name = "post_id", nullable = false)
    private Long postId;

    /** 물건 주인(오너) */
    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    /** 물건 빌리는 사용자(렌터) */
    @Column(name = "renter_id", nullable = false)
    private Long renterId;

    /** 방 생성 시각 */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /** 이 방의 메시지들 */
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> messages;


//    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<ChatMember> members;

//    @Builder
//    public ChatRoom(List<ChatMember> members) {
//        this.members = members;
//        this.members.forEach(m -> m.setChatRoom(this));
//    }
}
