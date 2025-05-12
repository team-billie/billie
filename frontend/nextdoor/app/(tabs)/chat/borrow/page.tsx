"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatsHeader from "@/components/chats/list/ChatsHeader";
import ChatRoomList from "@/components/chats/list/ChatRoomList";
import MainHeader from "@/components/common/Header/ReservationHeader";
import { ChatRoomUI } from "@/types/chats/chat";
import { getChatRooms, convertToChatRoomUI } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore"; 

export default function ChatBorrowPage() {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoomUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    const fetchChatRooms = async () => {
      if (!userId) {
        console.log("userId가 없어 채팅방을 불러올 수 없습니다.");
        return;
      }

      try {
        setIsLoading(true);
        console.log(`채팅방 목록 조회: userId=${userId}`);

        const rooms = await getChatRooms(userId);
        const uiRooms = rooms.map((room) => ({
          ...convertToChatRoomUI(room),
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
  }, [userId]);

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