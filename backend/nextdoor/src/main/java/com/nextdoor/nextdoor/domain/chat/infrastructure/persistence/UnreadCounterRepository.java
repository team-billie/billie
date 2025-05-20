package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounter;
import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounterKey;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

/**
 * Cassandra Counter 테이블 접근
 */
@Repository
public interface UnreadCounterRepository
        extends CassandraRepository<UnreadCounter, UnreadCounterKey> {
    // save() 호출만으로 CounterColumn이 자동 증가/감소 처리됩니다.
}
