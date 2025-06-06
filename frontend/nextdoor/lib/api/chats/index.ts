import {
  ChatMessageDto,
  ChatRoom,
  CreateChatRequest,
  ChatMessageHistoryPage,
  SendChatMessageRequest,
  SendChatMessageResponse,
} from "@/types/chats/chat";
import useUserStore from "@/lib/store/useUserStore";
import axiosInstance from "@/lib/api/instance";

// 채팅방 생성
export const createChatRoom = async (
  data: CreateChatRequest
): Promise<{ roomId: number }> => {
  try {
    const response = await axiosInstance.post("/api/v1/chats/rooms", {
      postId: data.postId,
      ownerId: data.ownerId,
      renterId: data.renterId,
    });
    return response.data;
  } catch (error) {
    console.error("채팅방 생성에 실패했습니다:", error);
    throw new Error("채팅방 생성에 실패했습니다.");
  }
};

// 채팅방 목록 조회 API
export const getChatRooms = async (): Promise<ChatRoom[]> => {
  try {
    const response = await axiosInstance.get("/api/v1/chats/rooms");
    return response.data;
  } catch (error) {
    console.error("채팅방 목록 조회에 실패했습니다:", error);
    throw new Error("채팅방 목록 조회에 실패했습니다.");
  }
};

/**
 * 백엔드 ChatMessageDto ->>>> 프론트엔드 Message 타입 바꾸기
 */
export const convertToMessage = (
  dto: ChatMessageDto,
  currentUserId: number
) => {
  return {
    id: `${dto.roomId}-${new Date(dto.sentAt).getTime()}`,
    text: dto.content,
    sender: dto.senderId === currentUserId ? "user" : "other",
    timestamp: new Date(dto.sentAt),
    read: true, // 메시지 조회 시 읽음 처리됨
  };
};

// convertToChatRoomUI 함수 수정 - null 처리 추가
export const convertToChatRoomUI = (room: ChatRoom, currentUserId: number) => {
  // 이미지 URL 형식 맞추기 - null 처리 추가
  const formatImageUrl = (url: string | null) => {
    if (!url) return "/images/profileimg.png";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return url.startsWith("/") ? url : `/${url}`;
  };

  // 상대방 ID 결정 (ownerId, renterId 정보 활용)
  const otherId = currentUserId === room.ownerId ? room.renterId : room.ownerId;

  return {
    roomId: room.roomId,
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
      name: room.title || "상품",
      image: formatImageUrl(room.postImageUrl),
      price: `${room.rentalFee?.toLocaleString()}원/일`,
    },
    ownerId: room.ownerId,
    renterId: room.renterId,
    postId: room.postId,
    title: room.title || "",
    rentalFee: room.rentalFee || 0,
    deposit: room.deposit || 0,
    chatStatus: room.chatStatus || "상태없음"
  };
};

// 메시지 이력 조회 (페이징)
export const getChatMessageHistory = async (
  roomId: number,
  page: number = 0,
  size: number = 50
): Promise<ChatMessageHistoryPage> => {
  // const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  // const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axiosInstance.get(`/api/v1/chats/rooms/${roomId}/messages`, {
    params: { page, size },
    // headers,
  }).then((res) => {
    // console.log("getChatMessageHistory 호출", res.data);
    return res.data;
  });

  return response;
};

// 메시지 전송
export const sendChatMessage = async (
  roomId: number,
  data: SendChatMessageRequest
): Promise<SendChatMessageResponse> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axiosInstance.post(`/api/v1/chats/rooms/${roomId}/messages`, data, { headers });
  return response.data;
};