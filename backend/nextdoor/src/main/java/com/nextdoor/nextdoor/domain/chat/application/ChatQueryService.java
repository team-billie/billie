package com.nextdoor.nextdoor.domain.chat.application;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import com.nextdoor.nextdoor.domain.chat.application.dto.ChatMessageDto;
import com.nextdoor.nextdoor.domain.chat.application.dto.ChatRoomDto;
import com.nextdoor.nextdoor.domain.chat.application.dto.MemberDto;
import com.nextdoor.nextdoor.domain.chat.application.dto.PostDto;
import com.nextdoor.nextdoor.domain.chat.application.dto.RentalDto;
import com.nextdoor.nextdoor.domain.chat.application.dto.ReservationDto;
import com.nextdoor.nextdoor.domain.chat.domain.ChatMessage;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ChatMessageRepository;
import com.nextdoor.nextdoor.domain.chat.infrastructure.persistence.ConversationRepository;
import com.nextdoor.nextdoor.domain.chat.domain.Conversation;
import com.nextdoor.nextdoor.domain.chat.port.ChatMemberQueryPort;
import com.nextdoor.nextdoor.domain.chat.port.ChatPostQueryPort;
import com.nextdoor.nextdoor.domain.chat.port.ChatRentalQueryPort;
import com.nextdoor.nextdoor.domain.chat.port.ChatReservationQueryPort;
import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatQueryService {

    private final ChatMessageRepository    messageRepo;
    private final ConversationRepository   conversationRepo;
    private final UnreadCounterService unreadCounterService;
    private final ChatMemberQueryPort chatMemberQueryPort;
    private final ChatPostQueryPort chatPostQueryPort;
    private final ChatReservationQueryPort chatReservationQueryPort;
    private final ChatRentalQueryPort chatRentalQueryPort;

//    /**
//     * 1:1 채팅방 목록 조회 (마지막 메시지 + 안 읽은 개수)
//     */
//    public List<ChatRoomDto> getChatRooms(Long memberId) {
//        // 1) 자신이 참여한 Conversation 리스트(채팅방 목록) 조회
//        List<Conversation> convs = conversationRepo
//                .findByParticipantIdsContains(memberId);
//
//        // 2) 각 방마다 마지막 메시지 꺼내서 DTO 생성
//        return convs.stream()
//                .map(conv -> {
//                    UUID cid = conv.getConversationId();
//
//                    // 3) 마지막 메시지 조회
//                    ChatMessage last = messageRepo
//                            .findFirstByKeyConversationIdOrderByKeySentAtDesc(cid);
//
//                    // 4) 안 읽은 메시지 개수 조회
//                    // 메시지 저장소 대신 UnreadCounterService 에서 꺼냄
//                    long unreadCount = unreadCounterService.getUnreadCount(cid, memberId);
//
//                    // 상대방 정보 조회 (자신이 오너인 경우 렌터, 자신이 렌터인 경우 오너)
//                    Long otherMemberId = conv.getOwnerId().equals(memberId) ? conv.getRenterId() : conv.getOwnerId();
//                    MemberDto otherMember = chatMemberQueryPort.findById(otherMemberId)
//                            .orElse(MemberDto.builder().nickname("").profileImageUrl("").build());
//
//                    // 게시물 이미지 URL 조회
//                    PostDto post = chatPostQueryPort.findById(conv.getPostId())
//                            .orElse(PostDto.builder().imageUrl("").build());
//
//                    return ChatRoomDto.builder()
//                            .conversationId(cid)
//                            .lastMessage(last != null ? last.getContent() : "")
//                            .lastSentAt (last != null ? last.getKey().getSentAt() : conv.getCreatedAt())
//                            .unreadCount(unreadCount)
//                            .otherNickname(otherMember.getNickname())
//                            .otherProfileImageUrl(otherMember.getProfileImageUrl())
//                            .postImageUrl(post.getImageUrl())
//                            .build();
//                })
//                .collect(Collectors.toList());
//    }

    /**
     * 빌리기(렌터) 채팅방 목록 조회
     * @param memberId 로그인한 렌터 사용자 ID
     */
    public List<ChatRoomDto> getBorrowingChatRooms(Long memberId) {
        // 1) renterId로 대화방 조회
        List<Conversation> convs = conversationRepo.findByRenterId(memberId);

        // 2) 각 방마다 마지막 메시지 + 미읽음 개수 뽑아서 DTO로 매핑
        return convs.stream()
                .map(conv -> {
                    UUID cid = conv.getConversationId();

                    // 마지막 메시지
                    ChatMessage last = messageRepo
                            .findFirstByKeyConversationIdOrderByKeySentAtDesc(cid);

                    // 미읽음 개수
                    long unreadCount = unreadCounterService.getUnreadCount(cid, memberId);

                    // 상대방(오너) 정보 조회
                    MemberDto otherMember = chatMemberQueryPort.findById(conv.getOwnerId())
                            .orElse(MemberDto.builder().nickname("").profileImageUrl("").build());

                    // 게시물 이미지 URL 조회
                    PostDto post = chatPostQueryPort.findById(conv.getPostId())
                            .orElse(PostDto.builder().imageUrl("").build());

                    // 채팅방 상태 결정
                    String chatStatus = determineChatStatus(conv.getPostId(), conv.getOwnerId(), conv.getRenterId());

                    return ChatRoomDto.builder()
                            .conversationId(cid)
                            .lastMessage(last != null ? last.getContent() : "")
                            .lastSentAt  (last != null ? last.getKey().getSentAt() : conv.getCreatedAt())
                            .unreadCount(unreadCount)
                            .otherNickname(otherMember.getNickname())
                            .otherProfileImageUrl(otherMember.getProfileImageUrl())
                            .postImageUrl(post.getImageUrl())
                            .ownerId(conv.getOwnerId())
                            .renterId(conv.getRenterId())
                            .postId(conv.getPostId())
                            .title(post.getTitle())
                            .rentalFee(post.getRentalFee())
                            .deposit(post.getDeposit())
                            .chatStatus(chatStatus)
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * 빌려주기(오너) 채팅방 목록 조회
     * @param memberId 로그인한 오너 사용자 ID
     */
    public List<ChatRoomDto> getLendingChatRooms(Long memberId) {
        // 1) ownerId 로 대화방 조회
        List<Conversation> convs = conversationRepo.findByOwnerId(memberId);

        // 2) 마지막 메시지 + 미읽음 개수 매핑
        return convs.stream()
                .map(conv -> {
                    UUID cid = conv.getConversationId();

                    // 마지막 메시지 조회
                    ChatMessage last = messageRepo
                            .findFirstByKeyConversationIdOrderByKeySentAtDesc(cid);

                    // 미읽음 메시지 수
                    long unread = unreadCounterService.getUnreadCount(cid, memberId);

                    // 상대방(렌터) 정보 조회
                    MemberDto otherMember = chatMemberQueryPort.findById(conv.getRenterId())
                            .orElse(MemberDto.builder().nickname("").profileImageUrl("").build());

                    // 게시물 이미지 URL 조회
                    PostDto post = chatPostQueryPort.findById(conv.getPostId())
                            .orElse(PostDto.builder().imageUrl("").build());

                    // 채팅방 상태 결정
                    String chatStatus = determineChatStatus(conv.getPostId(), conv.getOwnerId(), conv.getRenterId());

                    return ChatRoomDto.builder()
                            .conversationId(cid)
                            .lastMessage(last != null ? last.getContent() : "")
                            .lastSentAt  (last != null ? last.getKey().getSentAt() : conv.getCreatedAt())
                            .unreadCount(unread)
                            .otherNickname(otherMember.getNickname())
                            .otherProfileImageUrl(otherMember.getProfileImageUrl())
                            .postImageUrl(post.getImageUrl())
                            .ownerId(conv.getOwnerId())
                            .renterId(conv.getRenterId())
                            .postId(conv.getPostId())
                            .title(post.getTitle())
                            .rentalFee(post.getRentalFee())
                            .deposit(post.getDeposit())
                            .chatStatus(chatStatus)
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * 채팅방 상태 결정 로직
     * @param postId 게시글 ID
     * @param ownerId 오너 ID
     * @param renterId 렌터 ID
     * @return 채팅방 상태 (예약중, 거래중, 상태없음)
     */
    private String determineChatStatus(Long postId, Long ownerId, Long renterId) {
        // 예약 정보 조회
        ReservationDto reservation = chatReservationQueryPort.findByPostIdAndOwnerIdAndRenterId(postId, ownerId, renterId)
                .orElse(null);

        // 예약 정보가 없으면 "상태없음"
        if (reservation == null) {
            return "상태없음";
        }

        // 예약 상태가 PENDING이면 "예약중"
        if (reservation.getStatus() == ReservationStatus.PENDING) {
            return "예약중";
        }

        // 렌탈 정보 조회
        Long rentalId = reservation.getRentalId();
        if (rentalId == null) {
            return "상태없음";
        }

        RentalDto rental = chatRentalQueryPort.findById(rentalId).orElse(null);
        if (rental == null) {
            return "상태없음";
        }

        // 렌탈 프로세스가 RENTAL_COMPLETED가 아니면 "거래중"
        if (rental.getRentalProcess() != RentalProcess.RENTAL_COMPLETED) {
            return "거래중";
        }

        // 그 외에는 "상태없음"
        return "상태없음";
    }

    /**
     * 대화 내역(메시지 리스트) 조회
     * -> 조회 직후 해당 사용자(UnreadCounter.userId)의 카운터를 0으로 만들기 위해
     *    기존 unread_count 만큼 차감(clear) 처리
     */
    @Transactional
    public List<ChatMessageDto> getChatHistory(UUID conversationId, Long userId) {
        // 1) 메시지 조회
        List<ChatMessageDto> history = messageRepo.findByKeyConversationId(conversationId)
                .stream()
                .map(msg -> ChatMessageDto.builder()
                        .conversationId(msg.getKey().getConversationId())
                        .senderId       (msg.getSenderId())
                        .content        (msg.getContent())
                        .sentAt         (msg.getKey().getSentAt())
                        .build()
                )
                .collect(Collectors.toList());

        // 2) 현재 남은 unreadCount 조회
        long unreadCount = unreadCounterService.getUnreadCount(conversationId, userId);

        // 3) clearUnread 로 해당 만큼 차감
        if (unreadCount > 0) {
            unreadCounterService.clearUnread(conversationId, userId, unreadCount);
        }

        return history;
    }
}
