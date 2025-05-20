package com.nextdoor.nextdoor.domain.chat.domain;

import lombok.*;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;

/**
 * UnreadCounter 복합키: 방ID + 유저ID
 */
@PrimaryKeyClass
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UnreadCounterKey {

    @PrimaryKeyColumn(name = "room_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private Long roomId;

    @PrimaryKeyColumn(name = "user_id", ordinal = 1, type = PrimaryKeyType.CLUSTERED)
    private Long userId;
}
