"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatsHeader from "@/components/chats/list/ChatsHeader";
import ChatRoomList from "@/components/chats/list/ChatRoomList";
import MainHeader from "@/components/common/Header/ReservationHeader";
import { ChatRoomUI } from "@/types/chats/chat";
import { getChatRooms, convertToChatRoomUI } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore";

export default function ChatPage() {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoomUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { userId } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !userId) return;

    const fetchAllChatRooms = async () => {
      try {
        setIsLoading(true);
        console.log(`모든 채팅방 목록 조회: userId=${userId}`);

        const allChatRooms = await getChatRooms();

        // 모든 채팅방을 합치고 최신 메시지 순으로 정렬
        const allRooms = allChatRooms.map((room) => ({
          ...convertToChatRoomUI(room, userId),
          roomType: 'all' // 타입 구분을 위한 추가 필드
        }));
        setChatRooms(allRooms as ChatRoomUI[]);
        setError(null);
      } catch (err) {
        console.error("채팅방 목록 조회 오류:", err);
        setError("채팅방 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllChatRooms();
  }, [userId, mounted]);

  if (!mounted) {
    return (
      <main>
        <MainHeader title="Messages" />
        <ChatsHeader />
        <div className="p-4">로딩 중...</div>
      </main>
    );
  }

  return (
    <main>
      <MainHeader title="Messages" />
      <ChatsHeader />
      <ChatRoomList
        chatRooms={chatRooms}
        isLoading={isLoading}
        userRole="all" // userRole이 all일 때 처리하도록 ChatRoomList 컴포넌트 수정 필요
      />
    </main>
  );
}