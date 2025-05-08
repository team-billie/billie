"use client";

import { useState } from "react";
import ChatLayout from "@/components/chats/chatdetail/ChatLayout";
import ChatList from "@/components/chats/chatdetail/ChatList";
import { Message } from "@/types/chat";
import ChatAccordion from "@/components/chats/chatdetail/ChatAccordion";

export default function ChatDetailPage() {
  // 메시지 입력 상태
  const [value, setValue] = useState("");

  // 메시지 목록 상태 추가
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSend = (message: string) => {
    if (!message.trim()) return;

    // 새 메시지 객체 생성
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user", // 사용자가 보낸 메시지
      timestamp: new Date(),
      read: false,
    };

    // 메시지 목록에 추가
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    console.log("전송된 메시지:", message);
    setValue(""); // 전송 후 입력창 비우기

    // 가상의 응답 메시지 (실제 앱에서는 API 호출해야대미밍)
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "네, 알겠습니다!",
        sender: "other", // 상대방이 보낸 메시지
        timestamp: new Date(),
        read: false,
      };

      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    }, 1000);
  };

  return (
    <div className="h-screen">
      <ChatLayout
        username="꿍얼스꿍얼스"
        value={value}
        onChange={handleChange}
        onSendMessage={handleSend}
      >
        <ChatAccordion title="예약 및 제품 정보"></ChatAccordion>
        {/* ChatLayout 내부에 ChatList 컴포넌트 추가 */}
        <ChatList
          messages={messages}
          username="꿍얼스꿍얼스"
          userAvatar="/images/profileimg.png"
        />
      </ChatLayout>
    </div>
  );
}
