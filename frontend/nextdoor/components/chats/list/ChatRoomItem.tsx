// src/components/chats/list/ChatRoomItem.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChatRoomUI } from '@/types/chats/chat';
import { formatTime } from '@/lib/utils/date/formatDate';
import useUserStore from '@/lib/store/useUserStore'; 

interface ChatRoomItemProps {
  chat: ChatRoomUI;
  userRole: 'borrower' | 'lender';
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ chat, userRole }) => {
  const { userId } = useUserStore(); // useUserStore 사용
  // 상대방 사용자 찾기
  const otherUser = Array.isArray(chat.participants)
  ? chat.participants.find((p: { id: number }) => p.id !== userId) // 현재 사용자 제외
  : null;

  const chatDate = chat.lastMessage?.timestamp 
    ? formatTime(new Date(chat.lastMessage.timestamp))
    : '';
  
  return (
    <Link 
      href={`/chats/${chat.conversationId}`}
      className="flex items-start p-3 hover:bg-gray-50"
    >
      <div className="flex-shrink-0 mr-3 relative">
        {/* 제품 이미지 */}
        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200">
          <Image 
            src={chat.product?.image || '/icons/icon72.png'} 
            alt={chat.product?.name || '제품 이미지'}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        
        {/* 사용자 프로필 이미지 */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-gray-200">
          <Image 
            src={otherUser?.avatar || '/images/profileimg.png'} 
            alt={otherUser?.name || '사용자'}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className="text-md font-medium truncate">
            {otherUser?.name || 'renter name'}
          </h3>
          <span className="text-sm text-gray-500">
            {chatDate}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 truncate">
          {chat.lastMessage?.text || '새로운 대화를 시작해보세요.'}
        </p>
      </div>
      
      {chat.unreadCount ? (
        <div className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
        </div>
      ) : null}
    </Link>
  );
};

export default ChatRoomItem;