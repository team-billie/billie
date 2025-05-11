package com.nextdoor.nextdoor.domain.chat.domain;

import java.io.Serializable;
import java.util.UUID;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;

@PrimaryKeyClass
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UnreadCounterKey implements Serializable {

    @PrimaryKeyColumn(name = "conversation_id", type = PrimaryKeyType.PARTITIONED)
    private UUID   conversationId;

    @PrimaryKeyColumn(name = "user_id",         type = PrimaryKeyType.CLUSTERED)
    private Long   userId;
}
