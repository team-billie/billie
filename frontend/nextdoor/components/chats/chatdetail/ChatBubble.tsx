import React from "react";
import ProfileIcon from "@/components/common/Profile/icon";
import { Message } from "@/types/chats/chat";
import { formatTime } from "@/lib/utils/date/formatDate";
import useUserStore from '@/lib/store/useUserStore'; // useUserStore 추가

interface ChatBubbleProps {
  message: Message;
  showProfileIcon?: boolean;
  showUsername?: boolean;
  username?: string;
  profileIcon?: string;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  showProfileIcon = true,
  showUsername = true,
  username,
  profileIcon,
  className = "",
}) => {
  const isUser = message.sender === "user";
  
  // useUserStore에서 사용자 정보 가져오기
  const userStoreData = useUserStore();
  
  // props로 전달받은 값이 없는 경우 useUserStore의 값 사용
  const displayName = username || userStoreData.username || 'username';
  const displayIcon = profileIcon || userStoreData.profileImageUrl || '/images/profileimg.png';

  return (
    <div
      className={`flex items-start mb-4 ${
        isUser ? "justify-end" : ""
      } ${className}`}
    >
      {!isUser && showProfileIcon && (
        <div className="mr-2 mt-auto">
          <ProfileIcon src={displayIcon} alt={displayName} size={50} />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {!isUser && showUsername && (
          <span className="text-sm text-gray-700 mb-1">{displayName}</span>
        )}

        <div className="flex items-end">
          {/* 내 메시지일 때 시간 왼쪽 */}
          {isUser && (
            <span className="text-xs text-gray-500 mr-2 self-end">
              {formatTime(message.timestamp)}
            </span>
          )}

          <div
            className={`py-2 px-3 rounded-2xl max-w-xs break-words ${
              isUser
                ? "bg-blue-500 text-white rounded-br-md"
                : "bg-white text-black rounded-bl-md shadow-sm border border-gray-100"
            }`}
          >
            {message.text}
          </div>

          {/* 상대방 메시지일 때 시간 오른쪽 */}
          {!isUser && (
            <span className="text-xs text-gray-500 ml-2 self-end">
              {formatTime(message.timestamp)}
            </span>
          )}

          {/* 내 메시지 읽음 여부 */}
          {isUser && message.read && (
            <span className="text-xs text-blue-500 ml-1 self-end">읽음</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;