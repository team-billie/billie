package com.nextdoor.nextdoor.domain.chat.controller;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.domain.ChatRoom;
import com.nextdoor.nextdoor.domain.chat.dto.ChatRoomDto;
import com.nextdoor.nextdoor.domain.chat.dto.MessageDto;
import com.nextdoor.nextdoor.domain.chat.dto.SendMessageRequest;
import com.nextdoor.nextdoor.domain.chat.service.ChatRoomService;
import com.nextdoor.nextdoor.domain.chat.service.MessageService;
import com.nextdoor.nextdoor.domain.chat.service.UnreadCounterService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
/**
 * REST API 컨트롤러: 채팅방 목록/생성/삭제, 메시지 조회/전송/회수/검색
 */
@RestController
@RequestMapping("/api/v1/chats")
@RequiredArgsConstructor
public class ChatRestController {
    private final ChatRoomService chatRoomService;
    private final MessageService messageService;
    private final UnreadCounterService unreadCounterService;

    /** 1) 채팅방 목록 조회 */
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomDto>> listRooms(@AuthenticationPrincipal Long userId) {
        List<ChatRoom> rooms = chatRoomService.findRoomsByUser(userId);
        List<ChatRoomDto> dtos = rooms.stream().map(room -> {
            String lastMessage = room.getMessages().isEmpty()
                    ? ""
                    : room.getMessages().get(room.getMessages().size() - 1).getContent();
            LocalDateTime lastSentAt = room.getMessages().isEmpty()
                    ? room.getCreatedAt()
                    : room.getMessages().get(room.getMessages().size() - 1).getSentAt();
            long unreadCount = unreadCounterService.getCount(room.getId(), userId);
            return ChatRoomDto.from(room, lastMessage, lastSentAt, unreadCount);
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /** 2) 채팅방 생성 */
    @PostMapping("/rooms")
    public ResponseEntity<Map<String, Long>> createRoom(
            @RequestBody CreateRoomRequest request) {
        ChatRoom room = chatRoomService.createRoom(
                request.getPostId(),
                request.getOwnerId(),
                request.getRenterId()
        );
        return ResponseEntity.ok(Collections.singletonMap("roomId", room.getId()));
    }
    /** 3) 채팅 메시지 이력 조회 */
    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<Page<MessageDto>> getHistory(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long roomId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Page<ChatMessage> histories = messageService.getHistory(roomId, userId, page, size);
        Page<MessageDto> dtoPage = histories.map(MessageDto::from);
        return ResponseEntity.ok(dtoPage);
    }

    /** 4) 채팅 메시지 전송 */
    @PostMapping("/rooms/{roomId}/messages")
    public ResponseEntity<MessageDto> sendMessage(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long roomId,
            @RequestBody SendMessageRequest request) {
        ChatMessage saved = messageService.sendMessage(roomId, userId, request.getContent());
        return ResponseEntity.ok(MessageDto.from(saved));
    }

    /** 5) 채팅 메시지 삭제(회수) */
    @DeleteMapping("/messages/{messageId}")
    public ResponseEntity<Void> deleteMessage(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long messageId) {
        messageService.deleteMessage(messageId, userId);
        return ResponseEntity.noContent().build();
    }

    /** 6) 키워드 검색 */
    @GetMapping("/rooms/{roomId}/messages/search")
    public ResponseEntity<Page<MessageDto>> searchMessages(
            @PathVariable Long roomId,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Page<ChatMessage> results = messageService.searchMessages(roomId, keyword, page, size);
        Page<MessageDto> dtoPage = results.map(MessageDto::from);
        return ResponseEntity.ok(dtoPage);
    }

    /** 7) 채팅방 삭제 */
    @DeleteMapping("/rooms/{roomId}")
    public ResponseEntity<Void> deleteRoom(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long roomId) {
        chatRoomService.deleteRoom(roomId, userId);
        return ResponseEntity.noContent().build();
    }

    /** 채팅방 생성용 요청 DTO */
    @Data
    public static class CreateRoomRequest {
        private Long postId;
        private Long ownerId;
        private Long renterId;
    }
}