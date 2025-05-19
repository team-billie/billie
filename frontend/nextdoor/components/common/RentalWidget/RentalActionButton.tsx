// components/RentalActionButton.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface RentalActionButtonProps {
  rentalId: number;
  title: string;
  isOwner: boolean;
  productImage?: string;
  profileImage?: string;
  buttonText: string;
  actionLink?: string;
  onClick?: () => void;
  onNavigate?: (rentalId: number) => void;
  isShining?: boolean; // 추가: 빛나는 효과
}

const RentalActionButton: React.FC<RentalActionButtonProps> = ({
  rentalId,
  title,
  isOwner,
  productImage = "/icons/icon72.png",
  profileImage = "/images/profileimg.png",
  buttonText,
  actionLink,
  onClick,
  onNavigate,
  isShining = false,
}) => {
  // Link 클릭 시 호출될 함수
  const handleNavigate = (e: React.MouseEvent) => {
    if (onNavigate) {
      onNavigate(rentalId);
    }
  };
  
  // 오너/렌터에 따른 색상 선택 (오너: 빨간색, 렌터: 파란색)
  const borderColorClass = isOwner ? "border-red-300" : "border-blue-500";
  
  // 빛나는 효과가 있는지 여부에 따른 클래스
  const shiningClass = isShining ? "animate-item-shine" : "";

  return (
    <div className={`flex items-center bg-white rounded-2xl p-3 mb-3 border-l-4 ${borderColorClass} shadow-sm ${shiningClass}`}>
      <div className="relative mr-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200">
          <Image
            src={productImage}
            alt={title}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-white">
          <Image
            src={profileImage}
            alt="프로필"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center min-w-0 mr-2">
        <p className="font-semibold text-black text-sm mb-0 whitespace-nowrap">안심대여</p>
        <p className="text-xs text-gray-500 truncate whitespace-nowrap">{title}</p>
      </div>

      <div className="flex items-center">
        {onClick ? (
          // 모달을 열기 위한 버튼 (안심결제요청)
          <div className="relative pr-6 group">
            <button
              onClick={onClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors inline-block text-center whitespace-nowrap overflow-hidden text-ellipsis min-w-[120px]"
            >
              {buttonText}
            </button>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        ) : actionLink ? (
          // 링크 버튼에 onClick 이벤트 추가
          <Link 
            href={actionLink} 
            className="relative pr-6 group" 
            onClick={handleNavigate}
          >
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors inline-block text-center whitespace-nowrap overflow-hidden text-ellipsis min-w-[120px]">
              {buttonText}
            </span>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        ) : (
          // 비활성화 버튼
          <div className="relative pr-6">
            <button
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis min-w-[120px]"
            >
              {buttonText}
            </button>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400">→</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalActionButton;