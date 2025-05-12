import {
  ChatMessageDto,
  ChatRoom,
  CreateChatRequest,
  Conversation,
} from "@/types/chats/chat";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * 채팅방 생성 API
 * @param data 채팅방 생성 요청 데이터
 */
export const createChatRoom = async (
  data: CreateChatRequest
): Promise<Conversation> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/chats/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      participantIds: data.participantIds,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "채팅방 생성에 실패했습니다.");
  }

  return response.json();
};

/**
 * 채팅방 목록 조회 API
 * @param memberId 사용자 ID
 */
export const getChatRooms = async (memberId: number): Promise<ChatRoom[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/chats?memberId=${memberId}`,
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
    throw new Error(errorData.message || "채팅방 목록 조회에 실패했습니다.");
  }

  return response.json();
};

// // 상대방 유저아이디 가져오는 API 
// // import axios from "@/lib/api/axiosInstance";
// import axios from "axios";
// import { ChatRoomUI } from "@/types/chats/chat";

// export const getChatRoomByMember = async (memberId: number) => {
//   const res = await axios.get<ChatRoomUI[]>(
//     `/api/v1/chats?memberId=${memberId}`
//   );
//   return res.data;
// };

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
export const convertToChatRoomUI = (room: ChatRoom) => {
  return {
    conversationId: room.conversationId,
    lastMessage: {
      text: room.lastMessage || "",
      timestamp: new Date(room.lastSentAt),
    },
    unreadCount: room.unreadCount,
    // 임시 참가자 정보 (실제구현시 추가 API 호출 필요)
    participants: [
      {
        id: 1, // 현재 사용자
        name: "나요",
        avatar: "/images/profileimg.png",
      },
      {
        id: 2, // 상대방 (임시)
        name: "renter name",
        avatar: "/images/profileimg.png",
      },
    ],
    // 임시 상품 정보 (실제로는 추가 API 호출 필요)
    product: {
      id: 1,
      name: "꿍꿍꿍",
      image: "/images/profileimg.png",
      price: "20,000원/일",
    },
  };
};
