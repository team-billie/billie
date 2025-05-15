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

  // useUserStore에서 사용자 정보 가져오기
  const { userId } = useUserStore();

  // 컴포넌트 마운트 상태 설정
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트되었고 userId가 있을 때만 데이터 가져오기
    if (!mounted || !userId) return;

    const fetchChatRooms = async () => {
      try {
        setIsLoading(true);
        console.log(`빌리기 채팅방 목록 조회: userId=${userId}`);

        // userId 파라미터 제거 - 토큰 기반 인증으로 변경
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

  // 마운트되기 전에는 간단한 로딩 표시
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