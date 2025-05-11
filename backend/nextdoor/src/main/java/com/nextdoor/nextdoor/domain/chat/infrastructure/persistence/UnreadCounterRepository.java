package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import java.util.Optional;
import java.util.UUID;

import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounter;
import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounterKey;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnreadCounterRepository
        extends CassandraRepository<UnreadCounter, UnreadCounterKey> {

    // 안 읽은 채팅 수 조회
    Optional<UnreadCounter> findById(UnreadCounterKey key);
}
