package com.nextdoor.nextdoor.domain.chat.domain;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.*;

/**
 * Cassandra Counter를 이용한 미확인 메시지 개수 집계용 엔티티
 */
@Table("unread_counters")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UnreadCounter {
    @PrimaryKey
    private UnreadCounterKey key;

    @CounterColumn("unread_count")
    private long unreadCount;
}
