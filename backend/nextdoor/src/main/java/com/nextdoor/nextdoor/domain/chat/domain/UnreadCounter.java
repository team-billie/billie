package com.nextdoor.nextdoor.domain.chat.domain;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.*;

@Table("unread_counters")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UnreadCounter {
    @PrimaryKey
    private UnreadCounterKey key;

    @Column("unread_count")
    private long unreadCount;
}
