package com.nextdoor.nextdoor.domain.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import java.time.Instant;
import com.nextdoor.nextdoor.chat.domain.ChatMessageKey;

@Table("chat_message")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    private ChatMessageKey key;
    private Long senderId;
    private String content;
    private Instant sentAt;
}