"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatRoomList from "@/components/chats/list/ChatRoomList";
import ChatsHeader from "@/components/chats/list/ChatsHeader";
import { ChatRoomUI } from "@/types/chats/chat";
import { getChatRooms, convertToChatRoomUI } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore";

export default function ChatListPage() {
    const router = useRouter();
    const { userId } = useUserStore();
    const [chatRooms, setChatRooms] = useState<ChatRoomUI[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChatRooms = async () => {
            if (!userId) return;

            try {
                setIsLoading(true);
                const rooms = await getChatRooms();
                const uiRooms = rooms.map(room => convertToChatRoomUI(room, userId));
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
        <div className="flex flex-col h-screen bg-white">
            <ChatsHeader />
            <div className="flex-1 overflow-y-auto">
                <ChatRoomList
                    chatRooms={chatRooms}
                    isLoading={isLoading}
                    userRole="all"
                />
            </div>
        </div>
    );
} 