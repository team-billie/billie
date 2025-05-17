// components/chats/list/ChatRoomItem.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChatRoomUI } from '@/types/chats/chat';
import { formatTime } from '@/lib/utils/date/formatDate';
import useUserStore from '@/lib/store/useUserStore';
import ChatStatusIcon from './ChatStatusIcon'; 

interface ChatRoomItemProps {
  chat: ChatRoomUI;
  userRole: 'borrower' | 'lender';
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ chat, userRole }) => {
  const { userId } = useUserStore();
  
  // 상대방 정보 찾기
  const otherUser = chat.participants.find(p => p.id !== userId) || {
    id: 0,
    name: chat.participants[1]?.name || '상대방',
    avatar: chat.participants[1]?.avatar || '/images/profileimg.png'
  };

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
        
        {/* 상대방 프로필 이미지 */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-gray-200">
          <Image 
            src={otherUser.avatar || '/images/profileimg.png'} 
            alt={otherUser.name || '사용자'}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
        <div className="flex items-center space-x-0"> {/* space-x-0으로 설정 */}
        <h3 className="text-md font-medium truncate flex items-center">
  {otherUser.name || '상대방'} 
  <ChatStatusIcon status={chat.chatStatus} className="inline-block ml-1" />
</h3>
          </div>
          <span className="text-sm text-gray-500 flex-shrink-0">
            {chatDate}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-500 truncate">
            {chat.lastMessage?.text || '새로운 대화를 시작해보세요.'}
          </p>
          
          {chat.unreadCount ? (
            <div className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </div>
          ) : null}
        </div>
        
        {/* 제품 정보 -- 뺴도댐  */}
        <p className="text-xs text-gray-400 mt-1 truncate">
          {chat.title} • {chat.rentalFee.toLocaleString()}원/일
        </p>
      </div>
    </Link>
  );
};

export default ChatRoomItem;