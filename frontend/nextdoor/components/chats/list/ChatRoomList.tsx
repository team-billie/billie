// src/components/chats/list/ChatRoomList.tsx

"use client"

import React from 'react';
import { ChatRoomUI } from '@/types/chats/chat';
import ChatRoomItem from '@/components/chats/list/ChatRoomItem';
import EmptyState from '@/components/chats/list/EmptyState';
import LoadingSkeleton from '@/components/chats/list/LoadingSkeleton';
import { useRouter } from 'next/navigation';

interface ChatRoomListProps {
  chatRooms: ChatRoomUI[];
  isLoading: boolean;
  userRole: 'borrower' | 'lender' | 'all'; // 'all' 추가
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  chatRooms,
  isLoading,
  userRole
}) => {
  const router = useRouter();

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
    return <EmptyState userRole={userRole === 'all' ? 'borrower' : userRole} />;
  }

  return (
    <div className="divide-y">
      {sortedChats.map((room, idx) => (
        <div
          key={room.roomId ?? `room-fallback-${idx}`}
          onClick={() => router.push(`/chats/${room.roomId}`, { scroll: false })}
        >
          <ChatRoomItem
            chat={room}
            userRole={room.roomType === 'borrowing' ? 'borrower' : 'lender'}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;