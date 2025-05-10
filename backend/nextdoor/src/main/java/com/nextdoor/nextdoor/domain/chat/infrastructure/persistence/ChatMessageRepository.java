package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessageKey;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends CassandraRepository<ChatMessage, ChatMessageKey> {
    // 필요 시, 커스텀 쿼리 메소드 추가 가능
}