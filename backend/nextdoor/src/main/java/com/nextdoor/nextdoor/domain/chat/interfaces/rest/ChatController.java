package com.nextdoor.nextdoor.domain.chat.interfaces.rest;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.nextdoor.nextdoor.domain.chat.application.ChatService;
import com.nextdoor.nextdoor.domain.chat.application.ChatQueryService;
import com.nextdoor.nextdoor.domain.chat.application.dto.ChatMessageDto;
import com.nextdoor.nextdoor.domain.chat.application.dto.ChatRoomDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService       chatService;
    private final ChatQueryService  chatQueryService;

    /**
     * 채팅방 목록 조회
     * @param memberId 로그인한 사용자 ID
     */
    @GetMapping
    public List<ChatRoomDto> getChatRooms(@RequestParam Long memberId) {
        return chatQueryService.getChatRooms(memberId);
    }

    /**
     * 특정 채팅방의 대화 내역 조회
     * @param conversationId 채팅방 ID
     */
    @GetMapping("/{conversationId}/messages")
    public List<ChatMessageDto> getChatHistory(
            @PathVariable String conversationId) {
        return chatQueryService.getChatHistory(conversationId);
    }
}
