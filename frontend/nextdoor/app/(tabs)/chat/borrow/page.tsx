// import ChatsHeader from "@/components/chats/list/ChatsHeader";
// import MainHeader from "@/components/common/Header/ReservationHeader";
// import ChatsList from "@/components/chats/list/ChatRoomList";

// export default function ChatBorrowPage() {
//   return (
//     <main>
//       <MainHeader title="Messages" />
//       <ChatsHeader />
//       <ChatsList chatRooms={[1,2,3,4,5,6,7,8,9,10]} isLoading={false} userRole="borrower" />

//       <div className="h-screen overflow-y-auto p-4 flex flex-col gap-6"></div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatsHeader from "@/components/chats/list/ChatsHeader";
import ChatRoomList from "@/components/chats/list/ChatRoomList";
import MainHeader from "@/components/common/Header/ReservationHeader";
import { ChatRoomUI } from "@/types/chats/chat";
import { getChatRooms, convertToChatRoomUI } from "@/lib/api/chats";
import { useChatStore } from "@/lib/store/useChatStore"; 
import { useTestUserStore } from "@/lib/store/useTestUserStore";

export default function ChatBorrowPage() {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoomUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId, setUser } = useChatStore();
  const testUserId = useTestUserStore((state) => state.userId);

  // 테스트 사용자 ID가 있으면 채팅 스토어에 설정
  useEffect(() => {
    if (testUserId && !userId) {
      setUser(
        Number(testUserId),
        '테스트사용자',
        '/images/profileimg.png'
      );
    }
  }, [testUserId, userId, setUser]);

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