import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/chats/chat';
import ChatBubble from './ChatBubble';
import DateDivider from './DateDivider';
import useUserStore from '@/lib/store/useUserStore'; // useUserStore 추가

interface ChatListProps {
  messages: Message[];
  username?: string;
  userAvatar?: string;
  className?: string;
}

const ChatList: React.FC<ChatListProps> = ({
  messages,
  username,
  userAvatar,
  className = '',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // useUserStore에서 사용자 정보 가져오기
  const userStoreData = useUserStore();
  
  // props로 전달받은 값이 없는 경우 useUserStore의 값 사용
  const displayName = username || userStoreData.username || 'username';
  const displayAvatar = userAvatar || userStoreData.profileImage || '/images/profileimg.png';

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  const groupMessagesByDate = () => {
    const groups: { date: Date; messages: Message[] }[] = [];

    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp);
      messageDate.setHours(0, 0, 0, 0);

      const existingGroup = groups.find(
        (group) => group.date.getTime() === messageDate.getTime()
      );

      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({
          date: messageDate,
          messages: [message],
        });
      }
    });

    groups.sort((a, b) => a.date.getTime() - b.date.getTime());

    groups.forEach(group => {
      group.messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className={`flex-1 overflow-y-auto p-4 ${className}`}>
      {messageGroups.map((group, groupIndex) => (
        <div key={`group-${group.date.getTime()}-${groupIndex}`}>
          <DateDivider date={group.date} />

          {group.messages.map((message, messageIndex) => {
            const prevMessage = messageIndex > 0 ? group.messages[messageIndex - 1] : null;
            const isContinuous = prevMessage?.sender === message.sender;
            
            const isTimeClose = prevMessage 
              ? message.timestamp.getTime() - prevMessage.timestamp.getTime() < 5 * 60 * 1000
              : false;
            
            const showAvatar = !isContinuous || !isTimeClose;
            
            const uniqueKey = `${groupIndex}-${messageIndex}-${message.id}`;
            
            return (
              <ChatBubble
                key={uniqueKey}
                message={message}
                showProfileIcon={message.sender === 'other' && showAvatar}
                showUsername={message.sender === 'other' && showAvatar}
                username={displayName}
                profileIcon={displayAvatar}
              />
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatList;