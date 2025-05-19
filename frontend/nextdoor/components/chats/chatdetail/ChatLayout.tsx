import React, { ReactNode } from 'react';
import ChatHeader from '@/components/chats/chatdetail/ChatsDetailHeader';
import ChatInput from '@/components/chats/chatdetail/ChatInput';
import { Product } from '@/types/chats/chat';
import useUserStore from '@/lib/store/useUserStore';

interface ChatLayoutProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  username?: string;
  profileImage?: string; // 추가된 prop
  children: ReactNode;
  onSendMessage: (message: string) => void;
  onBackClick?: () => void;
  className?: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  username,
  profileImage = '/images/profileimg.png', 
  children,
  onSendMessage,
  value,
  onChange,
  onBackClick,
  className = '',
}) => {
  // useUserStore에서 사용자 정보 가져오기
  const { username: storeUsername } = useUserStore();
  
  // props로 전달받은 username이 없으면 스토어에서 가져온 값 사용
  const displayName = username || storeUsername || '사용자';
  
  return (
    <div className={`flex flex-col h-screen bg-gray-100 ${className}`}>
      {/* 헤더 */}
      <ChatHeader 
        username={displayName} 
        onBackClick={onBackClick}
        profileImage={profileImage}
      />
      
      {/* 채팅 내용 */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
      
      {/* 메시지 입력 */}
      <ChatInput onSendMessage={onSendMessage} value={value} onChange={onChange} />
    </div>
  );
};

export default ChatLayout;