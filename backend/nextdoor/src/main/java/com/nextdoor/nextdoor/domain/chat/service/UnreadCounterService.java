package com.nextdoor.nextdoor.domain.chat.service;

import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounter;
import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounterKey;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.UnreadCounterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.data.cassandra.core.query.Criteria;
import org.springframework.data.cassandra.core.query.Query;
import org.springframework.data.cassandra.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Cassandra Counter를 이용한 미확인 메시지 집계 로직
 */
@Service
@RequiredArgsConstructor
public class UnreadCounterService {

    private final CassandraTemplate cassandraTemplate;
    private final UnreadCounterRepository unreadCounterRepository;

    /** 채팅 수신 시 해당 유저의 미확인 카운트 1 증가 */
    public void increase(Long roomId, Long userId) {
        Query q = Query.query(
                Criteria.where("room_id").is(roomId),
                Criteria.where("user_id").is(userId)
        );
        Update u = Update.empty().increment("unread_count", 1);
        cassandraTemplate.update(q, u, UnreadCounter.class);
    }

    /** 사용자가 방 내역 열람 시 미확인 카운트 초기화 */
    public void reset(Long roomId, Long userId) {
        UnreadCounterKey key = new UnreadCounterKey(roomId, userId);

        unreadCounterRepository.deleteById(key);

        // 또는 CassandraTemplate 사용
        // Query dq = Query.query(
        //     Criteria.where("room_id").is(roomId),
        //     Criteria.where("user_id").is(userId)
        // );
        // cassandraTemplate.delete(dq, UnreadCounter.class);
    }

    /** 특정 유저의 미확인 메시지 개수 조회 */
    public long getCount(Long roomId, Long userId) {
        // 여러 CriteriaDefinition을 콤마로 나열합니다.
        Query query = Query.query(
                Criteria.where("room_id").is(roomId),
                Criteria.where("user_id").is(userId)
        );

        // selectOne은 UnreadCounter 또는 null 반환
        UnreadCounter counter = cassandraTemplate.selectOne(query, UnreadCounter.class);
        return (counter != null)
                ? counter.getUnreadCount()
                : 0L;
    }
}
