package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.Conversation;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends CassandraRepository<Conversation, Long> {
    /**
     * participantIds 컬렉션에 memberId가 포함된 Conversation 조회
     */
    @Query("SELECT * FROM conversation WHERE participant_ids CONTAINS :memberId ALLOW FILTERING")
    List<Conversation> findByParticipantIdsContains(Long memberId);
}