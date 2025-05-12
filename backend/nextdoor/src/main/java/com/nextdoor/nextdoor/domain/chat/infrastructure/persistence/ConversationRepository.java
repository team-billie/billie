package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import com.nextdoor.nextdoor.domain.chat.domain.Conversation;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConversationRepository extends CassandraRepository<Conversation, UUID> {
//    /**
//     * participantIds 컬렉션에 memberId가 포함된 Conversation 조회
//     */
//    @Query("SELECT * FROM conversation WHERE participant_ids CONTAINS :memberId ALLOW FILTERING")
//    List<Conversation> findByParticipantIdsContains(Long memberId);

    //빌리기(렌터) 전용 채팅 목록 조회
    @Query("SELECT * FROM conversation WHERE renter_id = :memberId ALLOW FILTERING")
    List<Conversation> findByRenterId(Long memberId);

    //빌려주기(오너) 전용 채팅 목록 조회
    @Query("SELECT * FROM conversation WHERE owner_id = :memberId ALLOW FILTERING")
    List<Conversation> findByOwnerId(Long memberId);

}