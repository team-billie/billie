"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatsHeader from "@/components/chats/list/ChatsHeader";
import ChatRoomList from "@/components/chats/list/ChatRoomList";
import MainHeader from "@/components/common/Header/ReservationHeader";
import { ChatRoomUI } from "@/types/chats/chat";
import { getChatRooms, convertToChatRoomUI } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore";
import { useChatListWebSocket } from "@/lib/hooks/chats/useChatListWebSocket";

export default function ChatPage() {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoomUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { userId } = useUserStore();

  // // 웹소켓 연결
  // const { isConnected, error: socketError } = useChatListWebSocket({
  //   onChatRoomUpdate: (updatedRoom) => {
  //     setChatRooms((prevRooms) => {
  //       const roomIndex = prevRooms.findIndex((room) => room.roomId === updatedRoom.roomId);
  //       if (roomIndex === -1) {
  //         // 새로운 채팅방인 경우
  //         return [updatedRoom, ...prevRooms];
  //       } else {
  //         // 기존 채팅방 업데이트
  //         const newRooms = [...prevRooms];
  //         newRooms[roomIndex] = updatedRoom;
  //         // 최신 메시지 순으로 정렬
  //         return newRooms.sort((a, b) =>
  //           new Date(b.lastSentAt).getTime() - new Date(a.lastSentAt).getTime()
  //         );
  //       }
  //     });
  //   },
  // });

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
        userRole="all"
      />
      {/* {!isConnected && !isLoading && (
        <div className="bg-yellow-100 p-2 text-sm text-center rounded-md mt-2">
          채팅 서버와 연결이 끊어졌습니다. 자동으로 재연결을 시도하고 있습니다.
        </div>
      )}
      {socketError && (
        <div className="bg-red-100 p-2 text-sm text-center rounded-md mt-2">
          {socketError}
        </div>
      )} */}
    </main>
  );
}