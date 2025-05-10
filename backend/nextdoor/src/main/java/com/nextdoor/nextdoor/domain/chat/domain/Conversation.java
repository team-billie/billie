package com.nextdoor.nextdoor.domain.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import java.time.Instant;
import java.util.List;

@Table("conversation")
@Data @NoArgsConstructor @AllArgsConstructor
public class Conversation {
    @PrimaryKey
    private String conversationId;

    @Column("participant_ids")
    private List<Long> participantIds;

    @Column("created_at")
    private Instant createdAt;
}