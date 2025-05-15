"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import useUserStore from '@/lib/store/useUserStore'; // useUserStore 추가

interface ChatDetailHeaderProps {
  username?: string; // 선택적으로 변경
  onBackClick?: () => void;
  className?: string;
}

const ChatDetailHeader: React.FC<ChatDetailHeaderProps> = ({
  username,
  onBackClick,
  className = "",
}) => {
  const router = useRouter();
  
  // useUserStore에서 사용자 정보 가져오기
  const { username: storeUsername } = useUserStore();
  
  // props로 전달받은 username이 없으면 스토어에서 가져온 값 사용
  const displayName = username || storeUsername || '사용자';

  const handleBackClick = onBackClick || (() => router.push("/chat/borrow"));

  return (
    <div className={`flex items-center p-4 bg-white border-b ${className}`}>
      <button
        onClick={handleBackClick}
        className="p-2 -ml-2 mr-2 rounded-full hover:bg-gray-100"
        aria-label="뒤로 가기"
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-lg font-medium">{displayName}</h1>
    </div>
  );
};

export default ChatDetailHeader;