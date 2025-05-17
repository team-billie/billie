"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ChatLayout from "@/components/chats/chatdetail/ChatLayout";
import ChatList from "@/components/chats/chatdetail/ChatList";
import ChatAccordion from "@/components/chats/chatdetail/ChatAccordion";
import { ChatMessageDto, Message } from "@/types/chats/chat";
import { getChatMessages, getBorrowingChatRooms, convertToChatRoomUI, getLendingChatRooms } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore"; 

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
  
  // 제품 정보 상태 - 서버 데이터 형식과 동일하게 맞춤
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

  // WebSocket 연결 상태 
  const [isConnected, setIsConnected] = useState(false);
  const [socketError, setSocketError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // 메시지 입력 상태 
  const [value, setValue] = useState("");

  // 메시지 목록 상태
  const [messages, setMessages] = useState<Message[]>([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          
          // 서버 데이터 그대로 저장 - currentRoom에 모든 필요한 정보가 있음
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


  // WebSocket 연결 설정
  useEffect(() => {
    if (!conversationId || !userId) return;

    const connectWebSocket = () => {
      try {
        if (socketRef.current) {
          socketRef.current.close();
          socketRef.current = null;
        }

        console.log(
          `WebSocket 연결 시도: userId=${userId}, conversationId=${conversationId}`
        );

        const WS_URL = "ws://k12e205.p.ssafy.io:8081";

        // 수정된 URL 형식으로 변경
        const token = localStorage.getItem("accessToken");
        const tokenParam = token ? `&token=${token}` : '';
        const socket = new WebSocket(
          `${WS_URL}/ws/chat?userId=${userId}&conv=${conversationId}${tokenParam}`
        );

        socket.onopen = () => {
          console.log("WebSocket 연결 성공");
          setIsConnected(true);
          setSocketError(null);
        };

        socket.onmessage = (event) => {
          try {
            console.log("Raw message:", event.data);
            const data = JSON.parse(event.data);
            console.log("메시지 수신:", data);

            if (
              data.conversationId &&
              data.senderId !== undefined &&
              data.content
            ) {
              const newMessage: Message = {
                id: `${data.conversationId}_${data.senderId}_${Date.now()}`,
                text: data.content,
                sender:
                  Number(data.senderId) === Number(userId) ? "user" : "other",
                timestamp: new Date(data.sentAt || Date.now()),
                read: false,
              };

              setMessages((prevMessages) => {
                const isDuplicate = prevMessages.some(
                  (m) =>
                    m.text === newMessage.text &&
                    m.sender === newMessage.sender &&
                    Math.abs(
                      m.timestamp.getTime() - newMessage.timestamp.getTime()
                    ) < 1000
                );

                if (isDuplicate) return prevMessages;
                return [...prevMessages, newMessage];
              });
            }
          } catch (err) {
            console.error("메시지 파싱 오류:", err, "원본 데이터:", event.data);
          }
        };

        socket.onerror = (event) => {
          console.error("WebSocket 오류:", event);
          setSocketError("연결 중 오류가 발생했습니다");
          setIsConnected(false);
        };

        socket.onclose = (event) => {
          console.log("WebSocket 연결 종료", event);
          console.log("연결 종료 코드:", event.code, "사유:", event.reason);
          setIsConnected(false);

          if (event.code !== 1000 && event.code !== 1001) {
            console.log("비정상 종료. 5초 후 재연결 시도");
            setTimeout(connectWebSocket, 5000);
          }
        };

        socketRef.current = socket;
      } catch (err) {
        console.error("WebSocket 초기화 오류:", err);
        setSocketError("연결을 초기화할 수 없습니다");
      }
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [conversationId, userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId || !userId) {
        console.log("conversationId나 userId가 없어 메시지를 불러올 수 없습니다.");
        return;
      }

      try {
        setIsLoading(true);
        console.log(
          `메시지 이력 조회: conversationId=${conversationId}`
        );

        const chatMessages = await getChatMessages(
          conversationId,
        );

        const formattedMessages = chatMessages.map((msg) => ({
          id: `${msg.conversationId}_${msg.senderId}_${new Date(
            msg.sentAt
          ).getTime()}`,
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

  const handleSend = (content: string) => {
    if (!content.trim() || !userId) return;

    if (!isConnected || !socketRef.current) {
      console.log("WebSocket 연결이 끊어짐. 메시지를 보낼 수 없음");
      alert("채팅 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      const message = {
        conversationId,
        senderId: userId,
        content,
        sentAt: new Date().toISOString(),
      };

      console.log("메시지 전송:", message);

      socketRef.current.send(JSON.stringify(message));
      setValue("");

      const newMessage: Message = {
        id: `${conversationId}_${userId}_${Date.now()}`,
        text: content,
        sender: "user",
        timestamp: new Date(),
        read: false,
      };

      setMessages((prev) => [...prev, newMessage]);
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
    >
      <ChatAccordion title="예약 및 제품 정보">
        <div className="flex items-start p-3">
          <div className="flex-shrink-0 mr-3 relative">
            {/* 제품 이미지 */}
            <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200">
              <Image 
                src={productInfo.postImageUrl}
                alt={productInfo.title}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-md font-medium">{productInfo.title}</h3>
            
            {/* 제품 정보 - 목록 페이지 스타일과 동일하게 */}
            <p className="text-xs text-gray-400 mt-1">
              {productInfo.title} • {productInfo.rentalFee.toLocaleString()}원/일
            </p>
            
            {/* 추가 정보 */}
            <p className="text-xs text-gray-400 mt-1">
              보증금: {productInfo.deposit.toLocaleString()}원
            </p>
          </div>
        </div>
      </ChatAccordion>

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

      {/* 디버깅  -- 나중에 삭제 하기 */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs overflow-auto">
          <h3 className="font-bold mb-1">디버깅 정보:</h3>
          <div>사용자 ID: {userId}</div>
          <div>상대방 ID: {otherUser.id}</div>
          <div>대화 ID: {conversationId}</div>
          <div>연결 상태: {isConnected ? "연결됨 ✅" : "연결 안됨 ❌"}</div>
          {socketError && <div>웹소켓 오류: {socketError}</div>}
          {error && <div>API 오류: {error}</div>}
          <div>메시지 수: {messages.length}</div>
        </div>
      )}
    </ChatLayout>
  );
}