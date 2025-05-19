package com.nextdoor.nextdoor.domain.chat.service;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMember;
import com.nextdoor.nextdoor.domain.chat.domain.ChatRoom;
import com.nextdoor.nextdoor.domain.chat.infrastructure.messaging.ChatMessagePayload;
import com.nextdoor.nextdoor.domain.chat.infrastructure.messaging.ChatMessageProducer;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

/**
 * 메시지 전송·조회·삭제·검색 등 메시지 단위 비즈니스 로직
 */
@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final ChatMessageRepository messageRepository;
    private final ChatRoomService roomService;
    private final ChatMessageProducer producer;
    private final UnreadCounterService counterService;

    /**
     * 메시지 발송 → DB 저장 → RabbitMQ 발행 → 다른 멤버의 UnreadCounter 증가
     */
    public ChatMessage sendMessage(Long roomId, Long senderId, String content) {
        ChatRoom room = roomService.findById(roomId);

        ChatMessage msg = ChatMessage.builder()
                .chatRoom(room)
                .senderId(senderId)
                .content(content)
                .build();
        ChatMessage saved = messageRepository.save(msg);

        // 1) RabbitMQ 퍼블리시
        ChatMessagePayload payload = ChatMessagePayload.builder()
                .roomId(roomId)
                .messageId(saved.getId())
                .senderId(senderId)
                .content(content)
                .sentAt(saved.getSentAt())
                .build();
        producer.publish(payload);

        // 2) 다른 멤버들의 미확인 카운트 증가
        room.getMembers().stream()
                .map(ChatMember::getUserId)
                .filter(id -> !id.equals(senderId))
                .forEach(otherId -> counterService.increase(roomId, otherId));

        return saved;
    }

    /**
     * 메시지 이력 조회 (읽을 때 UnreadCounter 리셋)
     */
    @Transactional(readOnly = true)
    public Page<ChatMessage> getHistory(Long roomId, Long userId, int page, int size) {
        // Unread 카운트 초기화
        counterService.reset(roomId, userId);

        Pageable pageable = PageRequest.of(page, size, Sort.by("sentAt").ascending());
        return messageRepository.findByChatRoomIdOrderBySentAtAsc(roomId, pageable);
    }

    /** 메시지 삭제(회수) 처리 – 작성자만 가능 */
    public void deleteMessage(Long messageId, Long requesterId) {
        ChatMessage msg = messageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 메시지 id=" + messageId));
        if (!msg.getSenderId().equals(requesterId)) {
            throw new SecurityException("작성자만 삭제할 수 있습니다.");
        }
        msg.markDeleted();
        messageRepository.save(msg);
    }

    /** 방 내 메시지 중 키워드 검색 */
    @Transactional(readOnly = true)
    public Page<ChatMessage> searchMessages(Long roomId, String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("sentAt").ascending());
        return messageRepository.findByChatRoomIdAndContentContaining(roomId, keyword, pageable);
    }
}
