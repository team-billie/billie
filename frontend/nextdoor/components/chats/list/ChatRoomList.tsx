// src/components/chats/list/ChatRoomList.tsx

"use client"

import React from 'react';
import { ChatRoomUI } from '@/types/chats/chat';
import ChatRoomItem from '@/components/chats/list/ChatRoomItem';
import EmptyState from '@/components/chats/list/EmptyState';
import LoadingSkeleton from '@/components/chats/list/LoadingSkeleton';

interface ChatRoomListProps {
  chatRooms: ChatRoomUI[];
  isLoading: boolean;
  userRole: 'borrower' | 'lender';
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ 
  chatRooms, 
  isLoading, 
  userRole 
}) => {
  // 최신 메시지 기준으로 정렬
  const sortedChats = [...chatRooms].sort((a, b) => {
    const dateA = a.lastMessage?.timestamp ? new Date(a.lastMessage.timestamp) : new Date(0);
    const dateB = b.lastMessage?.timestamp ? new Date(b.lastMessage.timestamp) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
  
  if (isLoading) {
    return <LoadingSkeleton count={5} />;
  }
  
  if (sortedChats.length === 0) {
    return <EmptyState userRole={userRole} />;
  }
  
  return (
    <div className="divide-y">
      {sortedChats.map(chat => (
        <ChatRoomItem 
          key={chat.conversationId} 
          chat={chat} 
          userRole={userRole} 
        />
      ))}
    </div>
  );
};

export default ChatRoomList;