import React, { useRef, useEffect } from 'react';
import { Message } from '@/types';
import ChatBubble from './ChatBubble';
import DateDivider from './DateDivider';

interface ChatListProps {
  messages: Message[];
  username?: string;
  userAvatar?: string;
  className?: string;
}

const ChatList: React.FC<ChatListProps> = ({
  messages,
  username = 'username',
  userAvatar,
  className = '',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 날짜별로 메시지 그룹화
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

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className={`flex-1 overflow-y-auto p-4 ${className}`}>
      {messageGroups.map((group, groupIndex) => (
        <div key={group.date.getTime()}>
          <DateDivider date={group.date} />

          {group.messages.map((message, messageIndex) => {
            // 연속된 메시지인지 확인
            const prevMessage = messageIndex > 0 ? group.messages[messageIndex - 1] : null;
            const isContinuous = prevMessage?.sender === message.sender;
            
            // 시간이 5분 이상 차이나면 연속된 메시지가 아님
            const isTimeClose = prevMessage 
              ? message.timestamp.getTime() - prevMessage.timestamp.getTime() < 5 * 60 * 1000
              : false;
            
            const showAvatar = !isContinuous || !isTimeClose;
            
            return (
              <ChatBubble
                key={message.id}
                message={message}
                showAvatar={message.sender === 'other' && showAvatar}
                showUsername={message.sender === 'other' && showAvatar}
                username={username}
                userAvatar={userAvatar}
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