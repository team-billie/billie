package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * JPA: ChatRoom CRUD
 */
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // 필요시 커스텀 쿼리 추가 예:
    // List<ChatRoom> findByMembersUserId(Long userId);
}
