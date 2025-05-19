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
    /**
     * 특정 사용자가 주인(owner)이거나 렌터(renter)인 방을 모두 가져온다.
     */
    List<ChatRoom> findByOwnerIdOrRenterId(Long ownerId, Long renterId);
}
