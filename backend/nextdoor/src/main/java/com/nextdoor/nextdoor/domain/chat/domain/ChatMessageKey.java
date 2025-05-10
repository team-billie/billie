package com.nextdoor.nextdoor.domain.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import java.time.Instant;

import static org.springframework.data.cassandra.core.cql.PrimaryKeyType.PARTITIONED;
//import static org.springframework.data.cassandra.core.mapping.PrimaryKeyType.PARTITIONED;

@PrimaryKeyClass
@Data @NoArgsConstructor @AllArgsConstructor
public class ChatMessageKey {
    @PrimaryKeyColumn(name = "conversation_id", ordinal = 0, type = PARTITIONED)
    private String conversationId;

    @PrimaryKeyColumn(name = "sent_at", ordinal = 1)
    private Instant sentAt;
}