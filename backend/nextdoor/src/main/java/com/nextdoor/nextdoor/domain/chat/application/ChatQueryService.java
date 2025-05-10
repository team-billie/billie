package com.nextdoor.nextdoor.domain.chat.application;

import java.util.List;
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
     * 1:1 채팅방 목록 조회
     */
    public List<ChatRoomDto> getChatRooms(Long memberId) {
        // 1) 자신이 참여한 Conversation 리스트
        List<Conversation> convs = conversationRepo
                .findByParticipantIdsContains(memberId);

        // 2) 각 방마다 마지막 메시지 꺼내서 DTO 생성
        return convs.stream()
                .map(conv -> {
                    String cid = conv.getConversationId();
                    ChatMessage last = messageRepo
                            .findFirstByKeyConversationIdOrderByKeySentAtDesc(cid);

                    return ChatRoomDto.builder()
                            .conversationId(cid)
                            .lastMessage(last != null ? last.getContent() : "")
                            .lastSentAt (last != null ? last.getKey().getSentAt() : conv.getCreatedAt())
                            .unreadCount(0L)  // TODO: 안 읽은 개수 로직 추가
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * 대화 내역(메시지 리스트) 조회
     */
    public List<ChatMessageDto> getChatHistory(String conversationId) {
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
