package com.nextdoor.nextdoor.domain.chat.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nextdoor.nextdoor.domain.chat.application.dto.ChatMessageDto;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ChatMessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatQueryService {

    private final ChatMessageRepository repository;

    /**
     * 대화방의 모든 메시지(페이징 전 기본 예시)를
     * ChatMessageDto 리스트로 반환
     */
    public List<ChatMessageDto> getChatHistory(String conversationId) {
        List<ChatMessage> messages = repository.findByKeyConversationId(conversationId);
        return messages.stream()
                .map(msg -> ChatMessageDto.builder()
                        .conversationId(msg.getKey().getConversationId())
                        .senderId       (msg.getSenderId())
                        .content        (msg.getContent())
                        .sentAt         (msg.getKey().getSentAt())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
