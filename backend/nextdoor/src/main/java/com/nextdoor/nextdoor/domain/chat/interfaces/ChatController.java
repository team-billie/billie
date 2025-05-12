package com.nextdoor.nextdoor.domain.chat.interfaces;

import java.util.List;
import java.util.UUID;

import com.nextdoor.nextdoor.domain.chat.application.ConversationService;
import com.nextdoor.nextdoor.domain.chat.application.dto.CreateConversationRequest;
import com.nextdoor.nextdoor.domain.chat.domain.Conversation;
import org.springframework.http.ResponseEntity;
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
    private final ConversationService conversationService;

    /**
     * 1:1 채팅방 생성
     */
    @PostMapping("/create")
    public Conversation createChatRoom(@RequestBody CreateConversationRequest req) {
        return conversationService.createConversation(
                req.getOwnerId(), req.getRenterId(), req.getPostId()
        );
    }


//    /**
//     * 채팅방 목록 조회
//     * @param memberId 로그인한 사용자 ID
//     */
//    @GetMapping
//    public List<ChatRoomDto> getChatRooms(@RequestParam Long memberId) {
//        return chatQueryService.getChatRooms(memberId);
//    }

    /**
     * 빌리기(렌터) 채팅방 목록 조회
     * GET /api/chats/borrowings?memberId=123
     */
    @GetMapping("/borrowings")
    public ResponseEntity<List<ChatRoomDto>> getBorrowingChatRooms(
            @RequestParam Long memberId) {
        List<ChatRoomDto> rooms = chatQueryService.getBorrowingChatRooms(memberId);
        return ResponseEntity.ok(rooms);
    }

    /**
     * 특정 채팅방의 대화 내역 조회
     * @param conversationId 채팅방 ID
     */
    @GetMapping("/{conversationId}/messages")
    public List<ChatMessageDto> getChatHistory(
            @PathVariable UUID conversationId,
            @RequestParam Long userId) {
        return chatQueryService.getChatHistory(conversationId, userId);
    }
}
