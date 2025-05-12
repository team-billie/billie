package com.nextdoor.nextdoor.domain.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Table("conversation")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Conversation {
//    @PrimaryKeyColumn(name = "conversation_id", type = PrimaryKeyType.PARTITIONED)
    @PrimaryKey
    @Column("conversation_id")
    private UUID conversationId;

    @Column("participant_ids")
    private List<Long> participantIds;

    @Column("created_at")
    private Instant createdAt;

    @Column("post_id")
    private Long postId;
}