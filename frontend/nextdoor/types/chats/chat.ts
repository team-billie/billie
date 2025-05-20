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
  roomId: string;
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
  title: string;
  rentalFee: number;
  deposit: number;
  chatStatus: string; // 상태없음 or 예약중 or 거래중
  roomType?: 'borrowing' | 'lending' | 'all';
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
  roomId: string;
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
export interface CreateChatRoomResponse {
  roomId: number;
}

export interface ChatRoom {
  roomId: number;
  postId: number;
  ownerId: number;
  renterId: number;
  lastMessage: string;
  lastSentAt: string;
  unreadCount: number;
  otherNickname: string;
  otherProfileImageUrl: string;
  postImageUrl: string;
  title: string;
  rentalFee: number;
  deposit: number;
  chatStatus: string;
}

// 사용자 역할
export type UserRole = "borrower" | "lender";

// 메시지 이력 조회 응답용 DTO
export interface ChatMessageHistoryDto {
  messageId: number;
  senderId: number;
  content: string;
  sentAt: string;
  deleted: boolean;
}

// 페이징 응답 타입
export interface ChatMessageHistoryPage {
  content: ChatMessageHistoryDto[];
  pageable: any; // 필요시 상세 타입 정의 가능
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

// 메시지 전송 요청
export interface SendChatMessageRequest {
  content: string;
}

// 메시지 전송 응답 (ChatMessageHistoryDto와 동일)
export type SendChatMessageResponse = ChatMessageHistoryDto;
