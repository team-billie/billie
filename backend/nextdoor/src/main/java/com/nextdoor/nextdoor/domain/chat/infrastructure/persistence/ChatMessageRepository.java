package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessageKey;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMessageRepository extends CassandraRepository<ChatMessage, ChatMessageKey> {
    // 특정 대화방 메시지 페이징 조회
    List<ChatMessage> findByKeyConversationId(UUID conversationId);

    // 마지막 메시지 조회,  마지막 메시지 한 건만 꺼내올 쿼리 메서드
    ChatMessage findFirstByKeyConversationIdOrderByKeySentAtDesc(UUID conversationId);

    // 안 읽은 메시지 개수 조회,  senderId 가 아닌 메시지 중 read = false(안 읽음) 개수 조회
    long countByKeyConversationIdAndSenderIdNotAndReadFalse(UUID conversationId, Long senderId);
}