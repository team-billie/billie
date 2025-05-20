"use client";

import React from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import useUserStore from '@/lib/store/useUserStore';
import Image from "next/image";
import ProfileIcon from "@/components/common/Profile/icon";

interface ChatDetailHeaderProps {
  username?: string;
  onBackClick?: () => void;
  className?: string;
  profileImage?: string;
}

const ChatDetailHeader: React.FC<ChatDetailHeaderProps> = ({
  username,
  onBackClick,
  className = "",
  profileImage = "/images/profileimg.png"
}) => {
  const router = useRouter();
  
  // useUserStore에서 사용자 정보 가져오기
  const { username: storeUsername } = useUserStore();
  
  // props로 전달받은 username이 없으면 스토어에서 가져온 값 사용
  const displayName = username || storeUsername || '사용자';  

  const handleBackClick = onBackClick || (() => router.push("/chat/borrow"));

  return (
    <div className={`flex items-center p-4 bg-white border-b shadow-sm ${className}`}>
      <button
        onClick={handleBackClick}
        className="p-2 -ml-2 mr-3 rounded-full hover:bg-gray-100 transition-all duration-200"
        aria-label="뒤로 가기"
      >
        <ArrowLeft size={20} className="text-gray-600" />
      </button>
      
      <div className="relative mr-3">
        {/* ProfileIcon 컴포넌트를 사용하여 프로필 이미지 렌더링 */}
        <ProfileIcon 
          src={profileImage} 
          alt={displayName} 
          size={40} 
        />
      </div>
      
      <h1 className="text-lg font-medium flex-1">{displayName}</h1>
      
      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-all duration-200">
        <MoreVertical size={20} />
      </button>
    </div>
  );
};

export default ChatDetailHeader;