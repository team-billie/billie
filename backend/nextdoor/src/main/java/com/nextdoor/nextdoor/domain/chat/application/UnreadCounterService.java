package com.nextdoor.nextdoor.domain.chat.application;

import java.util.List;
import java.util.UUID;

import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounter;
import org.springframework.data.cassandra.core.CassandraOperations;
import org.springframework.data.cassandra.core.query.Query;
import org.springframework.data.cassandra.core.query.Update;
import org.springframework.data.cassandra.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nextdoor.nextdoor.domain.chat.domain.UnreadCounterKey;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.UnreadCounterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UnreadCounterService {

    private final CassandraOperations       cassandraTemplate;
    private final UnreadCounterRepository   counterRepo;

    /**
     * conversation의 participant들 중 recipientIds에 대해
     * unread_count를 +1 한다.
     */
    public void incrementUnread(UUID conversationId, List<Long> recipientIds) {
        for (Long userId : recipientIds) {
            Query q = Query.query(
                    Criteria.where("conversation_id").is(conversationId),
                    Criteria.where("user_id").is(userId)
            );
            Update u = Update.update("unread_count", 1L);
            cassandraTemplate.update(q, u, UnreadCounter.class);
        }
    }

    /**
     * conversation의 특정 user에 대해 unread_count를 조회
     */
    public long getUnreadCount(UUID conversationId, Long userId) {
        return counterRepo
                .findById(new UnreadCounterKey(conversationId, userId))
                .map(UnreadCounter::getUnreadCount)
                .orElse(0L);
    }

    /**
     * 대화방 읽은 이벤트 발생 시, 사용자별로 카운터 차감
     */
    @Transactional
    public void clearUnread(UUID conversationId, Long userId, long n) {
        Query q = Query.query(
                Criteria.where("conversation_id").is(conversationId),
                Criteria.where("user_id").is(userId)
        );
        Update u = Update.update("unread_count", -n);
        cassandraTemplate.update(q, u, UnreadCounter.class);
    }
}
