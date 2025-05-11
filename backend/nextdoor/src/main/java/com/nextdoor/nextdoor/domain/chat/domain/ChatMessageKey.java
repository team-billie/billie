package com.nextdoor.nextdoor.domain.chat.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;
import lombok.*;
import org.springframework.data.cassandra.core.cql.Ordering;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;

@PrimaryKeyClass
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ChatMessageKey implements Serializable {
//    @PrimaryKeyColumn(name = "conversation_id", type = PrimaryKeyType.PARTITIONED)
    @PrimaryKey
    @Column("conversation_id")
    private Long conversationId;

    @PrimaryKeyColumn(name = "sent_at", type = PrimaryKeyType.CLUSTERED, ordering = Ordering.DESCENDING)
    private Instant sentAt;

    @PrimaryKeyColumn(name = "message_id", type = PrimaryKeyType.CLUSTERED)
    private UUID messageId;
}