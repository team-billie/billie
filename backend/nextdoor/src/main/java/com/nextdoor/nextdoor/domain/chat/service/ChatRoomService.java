package com.nextdoor.nextdoor.domain.chat.service;

import com.nextdoor.nextdoor.domain.chat.domain.ChatMember;
import com.nextdoor.nextdoor.domain.chat.domain.ChatRoom;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 채팅방 생성·조회 등의 방 단위 비즈니스 로직
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ChatRoomService {
    private final ChatRoomRepository roomRepository;

    /**
     * 1:1 채팅방 생성 (게시글ID, 오너ID, 렌터ID)
     */
    public ChatRoom createRoom(Long postId, Long ownerId, Long renterId) {
        ChatRoom room = ChatRoom.builder()
                .postId(postId)
                .ownerId(ownerId)
                .renterId(renterId)
                .build();
        return roomRepository.save(room);
    }

    /**
     * 유저가 주인 또는 렌터로 참여한 방 조회
     */
    public List<ChatRoom> findRoomsByUser(Long userId) {
        return roomRepository.findByOwnerIdOrRenterId(userId, userId);
    }

    /** 단일 채팅방 조회 (존재하지 않으면 예외) */
    @Transactional(readOnly = true)
    public ChatRoom findById(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방 id=" + roomId));
    }

    /** 채팅방 삭제 – 해당 방에 속한 사용자만 삭제 가능 */
    public void deleteRoom(Long roomId, Long userId) {
        ChatRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방 id=" + roomId));
        boolean isMember = room.getMembers().stream()
                .anyMatch(m -> m.getUserId().equals(userId));
        if (!isMember) {
            throw new SecurityException("채팅방 참여자만 삭제할 수 있습니다.");
        }
        roomRepository.delete(room);
    }
}
