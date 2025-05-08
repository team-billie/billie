"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatDetailHeaderProps {
  username: string;
  onBackClick?: () => void;
  className?: string;
}

const ChatDetailHeader: React.FC<ChatDetailHeaderProps> = ({
  username,
  onBackClick,
  className = "",
}) => {
  const router = useRouter();

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
      <h1 className="text-lg font-medium">{username}</h1>
    </div>
  );
};

export default ChatDetailHeader;
