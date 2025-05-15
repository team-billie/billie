// 프론트  UI용 메시지 타입
export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  read: boolean;
}

// UI 전용 채팅방 타입
export interface ChatRoomUI {
  conversationId: string;
  lastMessage?: {
    text: string;
    timestamp: Date;
  };
  lastSentAt: string;
  unreadCount: number;
  participants: Participant[];
  product?: Product | null;
  ownerId: number;
  renterId: number;
  postId: number;
}

// 사용자
export interface Participant {
  id: number;
  name: string;
  avatar?: string;
}

// 제품
export interface Product {
  id: number;
  name: string;
  image?: string;
  price?: number | string;
}

// =============== 백엔드 API 타입 ===============

// ChatMessageDto
export interface ChatMessageDto {
  conversationId: string;
  senderId: number;
  content: string;
  sentAt: string;
}


// 채팅방 생성 요청
export interface CreateChatRequest {
  ownerId: number;
  renterId: number;
  postId: number;
}

// 채팅방 생성 응답
export interface Conversation {
  conversationId: string;
  participantIds: number[];
  createdAt: string;
}



export interface ChatRoom {
  conversationId: string;
  lastMessage: string;
  lastSentAt: string;
  unreadCount: number;
  otherNickname: string;
  otherProfileImageUrl: string;
  postImageUrl: string;
  ownerId: number;
  renterId: number;
  postId: number;
}

// 사용자 역할
export type UserRole = "borrower" | "lender";
