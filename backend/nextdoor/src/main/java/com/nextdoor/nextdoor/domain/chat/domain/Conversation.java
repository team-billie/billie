package com.nextdoor.nextdoor.domain.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;
import java.time.Instant;
import java.util.List;

@Table("conversation")
@Data @NoArgsConstructor @AllArgsConstructor
public class Conversation {
    @PrimaryKeyColumn(name = "conversation_id", type = PrimaryKeyType.PARTITIONED)
    private String conversationId;

    @Column("participant_ids")
    private List<Long> participantIds;

    @Column("created_at")
    private Instant createdAt;
}