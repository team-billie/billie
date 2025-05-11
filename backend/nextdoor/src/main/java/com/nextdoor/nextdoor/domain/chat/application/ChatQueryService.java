package com.nextdoor.nextdoor.domain.chat.application;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nextdoor.nextdoor.domain.chat.application.dto.ChatMessageDto;
import com.nextdoor.nextdoor.domain.chat.application.dto.ChatRoomDto;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ChatMessageRepository;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ConversationRepository;
import com.nextdoor.nextdoor.domain.chat.domain.Conversation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatQueryService {

    private final ChatMessageRepository    messageRepo;
    private final ConversationRepository   conversationRepo;

    /**
     * 1:1 채팅방 목록 조회 (마지막 메시지 + 안 읽은 개수)
     */
    public List<ChatRoomDto> getChatRooms(Long memberId) {
        // 1) 자신이 참여한 Conversation 리스트(채팅방 목록) 조회
        List<Conversation> convs = conversationRepo
                .findByParticipantIdsContains(memberId);

        // 2) 각 방마다 마지막 메시지 꺼내서 DTO 생성
        return convs.stream()
                .map(conv -> {
                    UUID cid = conv.getConversationId();

                    // 3) 마지막 메시지 조회
                    ChatMessage last = messageRepo
                            .findFirstByKeyConversationIdOrderByKeySentAtDesc(cid);

                    // 4) 안 읽은 메시지 개수 조회
                    long unreadCount = messageRepo
                            .countUnreadMessages(cid, memberId);

                    return ChatRoomDto.builder()
                            .conversationId(cid)
                            .lastMessage(last != null ? last.getContent() : "")
                            .lastSentAt (last != null ? last.getKey().getSentAt() : conv.getCreatedAt())
                            .unreadCount(unreadCount)
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * 대화 내역(메시지 리스트) 조회
     */
    public List<ChatMessageDto> getChatHistory(UUID conversationId) {
        return messageRepo.findByKeyConversationId(conversationId)
                .stream()
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
