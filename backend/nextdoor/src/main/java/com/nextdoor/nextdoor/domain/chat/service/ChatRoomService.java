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

    /** 새로운 1:1 채팅방 생성 */
    public ChatRoom createRoom(List<Long> memberIds) {
        var members = memberIds.stream()
                .map(ChatMember::new)
                .collect(Collectors.toList());
        var room = ChatRoom.builder()
                .members(members)
                .build();
        return roomRepository.save(room);
    }

    /** 특정 유저가 속한 채팅방 전체 조회 */
    @Transactional(readOnly = true)
    public List<ChatRoom> findRoomsByUser(Long userId) {
        return roomRepository.findByMembersUserId(userId);
    }

    /** 단일 채팅방 조회 (존재하지 않으면 예외) */
    @Transactional(readOnly = true)
    public ChatRoom findById(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방 id=" + roomId));
    }
}
