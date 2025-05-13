import {
  ChatMessageDto,
  ChatRoom,
  CreateChatRequest,
  Conversation,
} from "@/types/chats/chat";
import useUserStore from "@/lib/store/useUserStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// 채팅방 생성
export const createChatRoom = async (
  data: CreateChatRequest
): Promise<Conversation> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/chats/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ownerId: data.ownerId,
      renterId: data.renterId,
      postId: data.postId,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "채팅방 생성에 실패했습니다.");
  }

  return response.json();
};

// 빌리기(렌터) 채팅방 목록 조회 API
export const getBorrowingChatRooms = async (
  memberId: number
): Promise<ChatRoom[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/chats/borrowings?memberId=${memberId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "빌리기 채팅방 목록 조회에 실패했습니다."
    );
  }

  return response.json();
};

// 빌려주기(오너) 채팅방 목록 조회 API
export const getLendingChatRooms = async (
  memberId: number
): Promise<ChatRoom[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/chats/lendings?memberId=${memberId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "빌려주기 채팅방 목록 조회에 실패했습니다."
    );
  }

  return response.json();
};

/**
 * 메시지 목록 조회 API
 * @param conversationId 채팅방 ID
 * @param userId 사용자 ID
 */
export const getChatMessages = async (
  conversationId: string,
  userId: number
): Promise<ChatMessageDto[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/chats/${conversationId}/messages?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "메시지 조회에 실패했습니다.");
  }

  return response.json();
};

/**
 * 백엔드 ChatMessageDto ->>>> 프론트엔드 Message 타입 바꾸기
 */
export const convertToMessage = (
  dto: ChatMessageDto,
  currentUserId: number
) => {
  return {
    id: `${dto.conversationId}-${new Date(dto.sentAt).getTime()}`,
    text: dto.content,
    sender: dto.senderId === currentUserId ? "user" : "other",
    timestamp: new Date(dto.sentAt),
    read: true, // 메시지 조회 시 읽음 처리됨
  };
};

/**
 * 백엔드 ChatRoom ->>>> 프론트엔드 UI에 맞게 바꿈 
 */
export const convertToChatRoomUI = (room: ChatRoom, currentUserId: number) => {
  // 이미지 URL 형식 맞추기
  const formatImageUrl = (url: string) => {
    if (!url) return "/images/profileimg.png";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return url.startsWith("/") ? url : `/${url}`;
  };

  // 상대방 ID 결정 (ownerId, renterId 정보 활용)
  const otherId = currentUserId === room.ownerId ? room.renterId : room.ownerId;

  return {
    conversationId: room.conversationId,
    lastMessage: {
      text: room.lastMessage || "",
      timestamp: new Date(room.lastSentAt),
    },
    lastSentAt: room.lastSentAt,
    unreadCount: room.unreadCount,
    participants: [
      {
        id: currentUserId,
        name: "나", 
        avatar: "/images/profileimg.png",
      },
      {
        id: otherId,
        name: room.otherNickname || "상대방",
        avatar: formatImageUrl(room.otherProfileImageUrl),
      },
    ],
    product: {
      id: room.postId || 1,
      name: "상품", 
      image: formatImageUrl(room.postImageUrl),
      price: "20,000원/일",
    },
    ownerId: room.ownerId,
    renterId: room.renterId,
    postId: room.postId
  };
};

/**
 * 채팅방 생성 또는 기존 채팅방 찾기
 * @param ownerId 소유자 ID
 * @param renterId 렌터 ID
 * @param postId 게시물 ID
 */
export const findOrCreateChatRoom = async (
  ownerId: number,
  renterId: number,
  postId: number
): Promise<string> => {
  try {
    const currentUserId = useUserStore.getState().userId;
    
    // 현재 사용자가 렌터인 경우
    if (currentUserId === renterId) {
      const borrowingRooms = await getBorrowingChatRooms(currentUserId);
      
      // 같은 소유자, 같은 게시물의 채팅방 찾기
      const existingRoom = borrowingRooms.find(room => 
        room.postId === postId && room.ownerId === ownerId
      );
      
      if (existingRoom) {
        return existingRoom.conversationId;
      }
    } 
    // 현재 사용자가 소유자인 경우
    else if (currentUserId === ownerId) {
      const lendingRooms = await getLendingChatRooms(currentUserId);
      
      // 같은 렌터, 같은 게시물의 채팅방 찾기
      const existingRoom = lendingRooms.find(room => 
        room.postId === postId && room.renterId === renterId
      );
      
      if (existingRoom) {
        return existingRoom.conversationId;
      }
    }
    
    // 기존 채팅방이 없으면 새로 생성
    const response = await createChatRoom({
      ownerId,
      renterId,
      postId
    });
    
    return response.conversationId;
  } catch (error) {
    console.error('채팅방 생성 오류:', error);
    throw error;
  }
};