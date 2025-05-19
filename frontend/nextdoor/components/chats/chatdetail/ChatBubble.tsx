import React from "react";
import ProfileIcon from "@/components/common/Profile/icon";
import { Message } from "@/types/chats/chat";
import { formatTime } from "@/lib/utils/date/formatDate";
import useUserStore from '@/lib/store/useUserStore';

interface ChatBubbleProps {
  message: Message;
  showProfileIcon?: boolean;
  showUsername?: boolean;
  showTimestamp?: boolean; 
  username?: string;
  profileIcon?: string;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  showProfileIcon = true,
  showUsername = true,
  showTimestamp = true, 
  username,
  profileIcon,
  className = "",
}) => {
  const isUser = message.sender === "user";

  const userStoreData = useUserStore();
  const displayName = username || userStoreData.username || 'username';
  const displayIcon = profileIcon || userStoreData.profileImageUrl || '/images/profileimg.png';

  return (
    <div className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"} ${className}`}>
      {!isUser && (
        <div className="mr-2 w-[50px]">
          {showProfileIcon && (
            <ProfileIcon src={displayIcon} alt={displayName} size={50} />
          )}
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {!isUser && showUsername && (
          <span className="text-sm text-gray-700 mb-1">{displayName}</span>
        )}

        <div className="flex items-end">
          {isUser && showTimestamp && (
            <span className="text-xs text-gray-500 mr-2 self-end">
              {formatTime(message.timestamp)}
            </span>
          )}

          <div
            className={`py-2 px-3 rounded-2xl max-w-xs break-words ${
              isUser
                ? "bg-blue-500 text-white rounded-2xl rounded-br-none"
                : "bg-white text-black rounded-2xl rounded-tl-none shadow-sm border border-gray-100"
            }`}
          >
            {message.text}
          </div>

          {!isUser && showTimestamp && (
            <span className="text-xs text-gray-500 ml-2 self-end">
              {formatTime(message.timestamp)}
            </span>
          )}

          {isUser && message.read && (
            <span className="text-xs text-blue-500 ml-1 self-end">읽음</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
