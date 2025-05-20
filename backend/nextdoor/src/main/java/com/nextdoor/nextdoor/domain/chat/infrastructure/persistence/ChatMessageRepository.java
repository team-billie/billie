package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * JPA: ChatMessage 영속화 및 조회
 */
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    /** 채팅방별 메시지 이력(시간순) */
    Page<ChatMessage> findByChatRoomIdOrderBySentAtAsc(Long roomId, Pageable pageable);

    /** 키워드 포함 메시지 검색 */
    Page<ChatMessage> findByChatRoomIdAndContentContaining(Long roomId, String keyword, Pageable pageable);
}
