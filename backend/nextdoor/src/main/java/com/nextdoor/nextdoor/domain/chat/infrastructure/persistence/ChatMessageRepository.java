package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessageKey;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends CassandraRepository<ChatMessage, ChatMessageKey> {
    // 특정 대화방 메시지 페이징 조회
    List<ChatMessage> findByKeyConversationId(String conversationId);

    // (필요시) 안 읽은 메시지 개수 조회 등 추가 메서드 선언
}