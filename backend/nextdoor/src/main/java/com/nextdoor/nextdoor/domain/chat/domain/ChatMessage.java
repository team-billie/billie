package com.nextdoor.nextdoor.domain.chat.domain;


import lombok.*;
import org.springframework.data.cassandra.core.mapping.*;

@Table("chat_messages")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ChatMessage {
    @PrimaryKey
    private ChatMessageKey key;

    @Column("sender_id")
    private Long senderId;

    @Column("content")
    private String content;

    @Column("is_read")
    private Boolean read;
}