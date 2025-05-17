"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatsHeader from "@/components/chats/list/ChatsHeader";
import ChatRoomList from "@/components/chats/list/ChatRoomList";
import MainHeader from "@/components/common/Header/ReservationHeader";
import { ChatRoomUI } from "@/types/chats/chat";
import { getBorrowingChatRooms, convertToChatRoomUI } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore";

export default function ChatBorrowPage() {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoomUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false); // 마운트 상태 추가

  const { userId } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !userId) return;

    const fetchChatRooms = async () => {
      try {
        setIsLoading(true);
        console.log(`빌리기 채팅방 목록 조회: userId=${userId}`);

        const rooms = await getBorrowingChatRooms();
        
        const uiRooms = rooms.map((room) => ({
          ...convertToChatRoomUI(room, userId),
          lastSentAt: room.lastSentAt
        }));
        setChatRooms(uiRooms);
        setError(null);
      } catch (err) {
        console.error("채팅방 목록 조회 오류:", err);
        setError("채팅방 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatRooms();
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
        userRole="borrower"
      />
    </main>
  );
}