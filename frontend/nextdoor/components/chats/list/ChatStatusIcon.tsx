import React from "react";
import Image from "next/image"; // next/image 임포트 추가

interface ChatStatusIconProps {
  status: string;
  className?: string;
}

const ChatStatusIcon: React.FC<ChatStatusIconProps> = ({ 
  status, 
  className = ""
}) => {
  const getStatusInfo = () => {
    switch (status) {
      case "예약중":
        return {
          imageSrc: "/icons/chat/chatReservaionStatusIcon2.png", 
          
        };
      case "거래중":
        return {
          imageSrc: "/icons/chat/chatRentalStatusIcon2.png", 
          
        };
      case "상태없음":
      default:
        return null; // 상태 없으면 아이콘 x 
    }
  };

  const statusInfo = getStatusInfo();
  
  // 상태가 상태없음이면 아무것도 렌더링하지 않음
  if (!statusInfo) return null;

  return (
    <span
    className={`inline-block ${className}`}
    style={{ lineHeight: 0 }}
    // title={statusInfo.tooltip}
    >
      <Image 
        src={statusInfo.imageSrc}
        alt={status}
        width={40}
        height={40}
        className="object-contain"
      />
    </span>
  );
};

export default ChatStatusIcon;