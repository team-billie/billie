import {
  ChatMessageDto,
  ChatRoom,
  CreateChatRequest,
  Conversation,
} from "@/types/chats/chat";
import useUserStore from "@/lib/store/useUserStore";
import axiosInstance from "@/lib/api/instance";

// 채팅방 생성
export const createChatRoom = async (
  data: CreateChatRequest
): Promise<Conversation> => {
  try {
    const response = await axiosInstance.post("/api/v1/chats/create", {
      ownerId: data.ownerId,
      renterId: data.renterId,
      postId: data.postId,
    });
    return response.data;
  } catch (error) {
    console.error("채팅방 생성에 실패했습니다:", error);
    throw new Error("채팅방 생성에 실패했습니다.");
  }
};

// 빌리기(렌터) 채팅방 목록 조회 API - memberId 파라미터 제거
export const getBorrowingChatRooms = async (): Promise<ChatRoom[]> => {
  try {
    const response = await axiosInstance.get("/api/v1/chats/borrowings");
    return response.data;
  } catch (error) {
    console.error("빌리기 채팅방 목록 조회에 실패했습니다:", error);
    throw new Error("빌리기 채팅방 목록 조회에 실패했습니다.");
  }
};

// 빌려주기(오너) 채팅방 목록 조회 API - memberId 파라미터 제거
export const getLendingChatRooms = async (): Promise<ChatRoom[]> => {
  try {
    const response = await axiosInstance.get("/api/v1/chats/lendings");
    return response.data;
  } catch (error) {
    console.error("빌려주기 채팅방 목록 조회에 실패했습니다:", error);
    throw new Error("빌려주기 채팅방 목록 조회에 실패했습니다.");
  }
};

/**
 * 메시지 목록 조회 API - userId 파라미터 제거
 * @param conversationId 채팅방 ID
 */
export const getChatMessages = async (
  conversationId: string
): Promise<ChatMessageDto[]> => {
  try {
    const response = await axiosInstance.get(`/api/v1/chats/${conversationId}/messages`);
    return response.data;
  } catch (error) {
    console.error("메시지 조회에 실패했습니다:", error);
    throw new Error("메시지 조회에 실패했습니다.");
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
    id: `${dto.conversationId}-${new Date(dto.sentAt).getTime()}`,
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

/**
 * 채팅방 생성 또는 기존 채팅방 찾기 - API 호출 수정
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
      const borrowingRooms = await getBorrowingChatRooms();
      
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
      const lendingRooms = await getLendingChatRooms();
      
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