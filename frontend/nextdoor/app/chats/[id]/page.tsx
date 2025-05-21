"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ChatLayout from "@/components/chats/chatdetail/ChatLayout";
import ChatList from "@/components/chats/chatdetail/ChatList";
import ChatAccordion from "@/components/chats/chatdetail/ChatProductInfoCard";
import { Message } from "@/types/chats/chat";
import { getChatRooms, convertToChatRoomUI, getChatMessageHistory } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore";
import { useWebSocket } from "@/lib/hooks/chats/useWebSocket";
import ProductInfoCard from "@/components/chats/chatdetail/ChatProductInfoCard";

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = Number(params.id);

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
    roomId: 0,
    postId: 0,
    ownerId: 0,
    renterId: 0,
    lastMessage: "",
    lastSentAt: "",
    unreadCount: 0,
    otherNickname: "",
    otherProfileImageUrl: "",
    postImageUrl: "/icons/icon72.png",
    title: "",
    rentalFee: 0,
    deposit: 0,
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
    roomId: Number(roomId),
    onMessage: (chatMessage) => {
      console.log("메시지 수신:", chatMessage);
      // 중복 체크 로직
      const newMessage: Message = {
        id: Number(`${chatMessage.roomId}${chatMessage.senderId}${new Date(chatMessage.sentAt).getTime()}`),
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
        const rooms = await getChatRooms();
        const currentRoom = rooms.find(room => room.roomId === Number(roomId));

        if (currentRoom) {
          // 채팅방 UI 데이터로 변환
          const roomUI = convertToChatRoomUI(currentRoom, userId);

          // 상대방 찾기 (내 ID가 아닌 참가자)
          const otherId = userId === currentRoom.ownerId ? currentRoom.renterId : currentRoom.ownerId;
          setOtherUser({
            id: otherId,
            name: currentRoom.otherNickname || '상대방',
            avatar: currentRoom.otherProfileImageUrl || '/images/profileimg.png'
          });

          // 서버 데이터 그대로 저장
          setProductInfo({
            roomId: currentRoom.roomId,
            postId: currentRoom.postId,
            ownerId: currentRoom.ownerId,
            renterId: currentRoom.renterId,
            lastMessage: currentRoom.lastMessage || "",
            lastSentAt: currentRoom.lastSentAt,
            unreadCount: currentRoom.unreadCount,
            otherNickname: currentRoom.otherNickname,
            otherProfileImageUrl: currentRoom.otherProfileImageUrl,
            postImageUrl: currentRoom.postImageUrl,
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
  }, [roomId, userId]);

  // 메시지 이력 가져오기
  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId || !userId) {
        console.log("roomId나 userId가 없어 메시지를 불러올 수 없습니다.");
        return;
      }

      try {
        setIsLoading(true);
        console.log(`메시지 이력 조회: roomId=${roomId}`);

        // getChatMessageHistory로 변경 (0페이지, 50개)
        const historyPage = await getChatMessageHistory(roomId, 0, 50);
        const chatMessages = historyPage.content;

        const formattedMessages = chatMessages.map((msg) => ({
          id: `${msg.messageId}`,
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

    if (roomId && userId) {
      fetchMessages();
    }
  }, [roomId, userId]);

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

    //B안: 메시지 전송 후, onMessage 콜백이 오기 전에 optimistic하게 UI에 바로 추가
    //(즉, 메시지 전송 성공 시 바로 setMessages로 추가)
    const sent = sendMessage(content);
    if (sent) {
      // optimistic update
      setMessages((prev) => [
        ...prev,
        {
          id: `local_${Date.now()}`,
          text: content,
          sender: "user",
          timestamp: new Date(),
          read: false,
        },
      ]);
      setValue("");
    }
  };

  const handleBackClick = () => {
    router.push("/chats");
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