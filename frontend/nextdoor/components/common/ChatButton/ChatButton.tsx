"use client";

import { findOrCreateChatRoom } from "@/lib/api/chats";
import useUserStore from "@/lib/store/useUserStore";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ChatButtonProps {
  ownerId: number;
  postId: number;
  className?: string;
}

export default function ChatButton({ ownerId, postId, className = "" }: ChatButtonProps) {
  const router = useRouter();
  const userId = useUserStore(state => state.userId);
  const [isLoading, setIsLoading] = useState(false);

  const handleChatClick = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    
    if (ownerId === userId) {
      alert("자신의 게시글에는 채팅을 보낼 수 없습니다.");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // findOrCreateChatRoom 함수 호출
      const conversationId = await findOrCreateChatRoom(
        ownerId,       // 소유자 ID
        userId,        // 현재 사용자 ID (렌터)
        postId         // 게시글 ID
      );
      
      // 채팅방으로 이동
      router.push(`/chats/${conversationId}`);
    } catch (error) {
      console.error('채팅방 접속 오류:', error);
      alert('채팅방에 접속할 수 없습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleChatClick} 
      disabled={isLoading}
      className={`bg-gradient-to-r from-blue300 to-blue400 text-white rounded-full p-2 flex items-center justify-center ${className}`}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </button>
  );
}