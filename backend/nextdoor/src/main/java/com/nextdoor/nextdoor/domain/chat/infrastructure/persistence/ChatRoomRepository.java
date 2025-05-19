package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JPA: ChatRoom CRUD
 */
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // 특정 유저가 속한 채팅방 전체 조회
     List<ChatRoom> findByMembersUserId(Long userId);
}
