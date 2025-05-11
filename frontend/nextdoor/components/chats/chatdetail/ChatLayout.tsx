import React, { ReactNode } from 'react';
import ChatHeader from '@/components/chats/chatdetail/ChatsDetailHeader';
// import ProductInfo from '../chat/ProductInfo';
import ChatInput from '@/components/chats/chatdetail/ChatInput';
import { Product } from '@/types/chats/chat';

interface ChatLayoutProps {
  value: string;
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  username: string;
  // product: Product;
  children: ReactNode;
  onSendMessage: (message: string) => void;
  onBackClick?: () => void;
  className?: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  username,
  // product,
  children,
  onSendMessage,
  value,
  onChange,
  onBackClick,
  className = '',
}) => {
  return (
    <div className={`flex flex-col h-screen bg-gray-100 ${className}`}>
      {/* 헤더 */}
      <ChatHeader 
        username={username} 
        onBackClick={onBackClick} 
      />
      
      {/* 제품 정보 */}
      {/* <ProductInfo product={product} /> */}
      
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