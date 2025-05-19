"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ChatLayout from "@/components/chats/chatdetail/ChatLayout";
import ChatList from "@/components/chats/chatdetail/ChatList";
import ChatAccordion from "@/components/chats/chatdetail/ChatProductInfoCard";
import { Message } from "@/types/chats/chat";
import { getChatMessages, getBorrowingChatRooms, convertToChatRoomUI, getLendingChatRooms } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore";
import { useWebSocket } from "@/lib/hooks/chats/useWebSocket"; // 웹소켓 훅 import
import ProductInfoCard from "@/components/chats/chatdetail/ChatProductInfoCard";

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;

  // useUserStore에서 사용자 정보 가져오기
  const { userId, username, profileImageUrl } = useUserStore();
  
  // 상대방 정보 상태
  const [otherUser, setOtherUser] = useState({
    id: 0,
    name: '상대방',
    avatar: '/images/profileimg.png'
  });
  
  // 제품 정보 상태
  const [productInfo, setProductInfo] = useState({
    conversationId: "",
    lastMessage: "",
    lastSentAt: "",
    unreadCount: 0,
    otherNickname: "",
    otherProfileImageUrl: "",
    postImageUrl: "/icons/icon72.png",
    ownerId: 0,
    renterId: 0,
    postId: 0,
    title: "iPhone 15 Pro 대여",
    rentalFee: 30000,
    deposit: 300000,
    chatStatus: "상태없음"
  });

  // 메시지 입력 상태 
  const [value, setValue] = useState("");

  // 메시지 목록 상태
  const [messages, setMessages] = useState<Message[]>([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useWebSocket 훅 사용하기
  const { 
    isConnected, 
    error: socketError, 
    sendMessage 
  } = useWebSocket({
    conversationId,
    onMessage: (chatMessage) => {
      console.log("메시지 수신:", chatMessage);
      // 중복 체크 로직
      const newMessage: Message = {
        id: `${chatMessage.conversationId}_${chatMessage.senderId}_${new Date(chatMessage.sentAt).getTime()}`,
        text: chatMessage.content,
        sender: Number(chatMessage.senderId) === Number(userId) ? "user" : "other",
        timestamp: new Date(chatMessage.sentAt),
        read: false,
      };

      setMessages((prevMessages) => {
        // 중복 메시지 체크
        const isDuplicate = prevMessages.some(
          (m) =>
            m.text === newMessage.text &&
            m.sender === newMessage.sender &&
            Math.abs(m.timestamp.getTime() - newMessage.timestamp.getTime()) < 5000
        );

        if (isDuplicate) return prevMessages;
        return [...prevMessages, newMessage];
      });
    }
  });

  // 채팅방 정보와 참가자 정보 가져오기
  useEffect(() => {
    const fetchChatRoomInfo = async () => {
      if (!userId) return;
      
      try {
        // 두 API 모두 호출
        const borrowingRooms = await getBorrowingChatRooms();
        const lendingRooms = await getLendingChatRooms();
        
        // 모든 채팅방 합치기
        const allRooms = [...borrowingRooms, ...lendingRooms];
        
        // 현재 conversationId와 일치하는 채팅방 찾기
        const currentRoom = allRooms.find(room => room.conversationId === conversationId);
        
        if (currentRoom) {
          // 채팅방 UI 데이터로 변환
          const roomUI = convertToChatRoomUI(currentRoom, userId);
          
          // 상대방 찾기 (내 ID가 아닌 참가자)
          if (Array.isArray(roomUI.participants) && roomUI.participants.length > 0) {
            const other = roomUI.participants.find(p => p.id !== userId);
            if (other) {
              setOtherUser({
                id: other.id,
                name: other.name || '상대방',
                avatar: other.avatar || '/images/profileimg.png'
              });
            }
          }
          
          // 서버 데이터 그대로 저장
          setProductInfo({
            conversationId: currentRoom.conversationId,
            lastMessage: currentRoom.lastMessage || "",
            lastSentAt: currentRoom.lastSentAt,
            unreadCount: currentRoom.unreadCount,
            otherNickname: currentRoom.otherNickname,
            otherProfileImageUrl: currentRoom.otherProfileImageUrl,
            postImageUrl: currentRoom.postImageUrl,
            ownerId: currentRoom.ownerId,
            renterId: currentRoom.renterId,
            postId: currentRoom.postId,
            title: currentRoom.title,
            rentalFee: currentRoom.rentalFee,
            deposit: currentRoom.deposit,
            chatStatus: currentRoom.chatStatus
          });
        }
      } catch (err) {
        console.error("채팅방 정보 조회 오류:", err);
      }
    };
    
    fetchChatRoomInfo();
  }, [conversationId, userId]);

  // 메시지 이력 가져오기
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId || !userId) {
        console.log("conversationId나 userId가 없어 메시지를 불러올 수 없습니다.");
        return;
      }

      try {
        setIsLoading(true);
        console.log(`메시지 이력 조회: conversationId=${conversationId}`);

        const chatMessages = await getChatMessages(conversationId);

        const formattedMessages = chatMessages.map((msg) => ({
          id: `${msg.conversationId}_${msg.senderId}_${new Date(msg.sentAt).getTime()}`,
          text: msg.content,
          sender: Number(msg.senderId) === Number(userId) ? "user" : "other",
          timestamp: new Date(msg.sentAt),
          read: false,
        }));

        setMessages(formattedMessages as Message[]);
        setError(null);
      } catch (err) {
        console.error("메시지 조회 오류:", err);
        setError("메시지를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (conversationId && userId) {
      fetchMessages();
    }
  }, [conversationId, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleProductDetailClick = () => {
    // 상품 상세 페이지로 이동
    if (productInfo.postId) {
      router.push(`/posts/${productInfo.postId}`);
    }
  };

  const handleSend = (content: string) => {
    if (!content.trim() || !userId) return;

    if (!isConnected) {
      console.log("WebSocket 연결이 끊어짐. 메시지를 보낼 수 없음");
      alert("채팅 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      // useWebSocket 훅의 sendMessage 함수 사용
      const sent = sendMessage(content);
      if (sent) {
        setValue("");
      } else {
        console.error("메시지 전송 실패");
      }
    } catch (err) {
      console.error("메시지 전송 오류:", err);
      alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleBackClick = () => {
    router.push("/chat/borrow");
  };

  return (
    <ChatLayout
      username={otherUser.name} 
      value={value}
      onChange={handleChange}
      onSendMessage={handleSend}
      onBackClick={handleBackClick}
      profileImage={otherUser.avatar}
      
    >
      <div className="px-3 mt-2">
  <ProductInfoCard 
    productInfo={productInfo}
    onDetailClick={handleProductDetailClick}
  />
</div>

      {/* 채팅 목록 */}
      <ChatList
        messages={messages} 
        username={otherUser.name} 
        userAvatar={otherUser.avatar} 
      />

      {/* 연결 상태 표시 */}
      {!isConnected && !isLoading && (
        <div className="bg-yellow-100 p-2 text-sm text-center rounded-md mt-2">
          채팅 서버와 연결이 끊어졌습니다. 자동으로 재연결을 시도하고 있습니다.
        </div>
      )}

      {socketError && (
        <div className="bg-red-100 p-2 text-sm text-center rounded-md mt-2">
          {socketError}
        </div>
      )}
    </ChatLayout>
  );
}