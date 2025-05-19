// components/ReservationActionButton.tsx
import React from "react";
import Image from "next/image";

interface ReservationActionButtonProps {
  id: number;
  title: string;
  detail?: string;
  productImage?: string;
  profileImage?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isReservation?: boolean;
  isOwner?: boolean; // 추가: 오너 여부 (빨간색/파란색 경계선용)
  actionText?: string;
  onAction?: () => void;
  onNavigate?: (id: number) => void;
  isShining?: boolean; // 추가: 빛나는 효과
}

const ReservationActionButton: React.FC<ReservationActionButtonProps> = ({
  id,
  title,
  detail,
  productImage = "/icons/icon72.png",
  profileImage = "/images/profileimg.png",
  onConfirm,
  onCancel,
  isReservation = false,
  isOwner = true, // 기본값은 오너 (빨간색)
  actionText,
  onAction,
  onNavigate,
  isShining = false,
}) => {
  // 확정 버튼 클릭 시 호출될 함수
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      // 확정 후 페이지 이동은 없으므로 onNavigate는 호출하지 않음
    }
  };

  // 취소 버튼 클릭 시 호출될 함수
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      // 취소 후 위젯이 닫힐 필요가 없으므로 onNavigate는 호출하지 않음
    }
  };

  // 액션 버튼 클릭 시 호출될 함수
  const handleAction = () => {
    if (onAction) {
      onAction();
      
      // 액션 후 페이지 이동이 있으면 위젯 닫기
      if (onNavigate) {
        onNavigate(id);
      }
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
        <p className="font-semibold text-black text-sm mb-0 whitespace-nowrap">
          {isReservation ? "예약요청" : "안심대여"}
        </p>
        <p className="text-xs text-gray-500 truncate whitespace-nowrap">{detail || title}</p>
      </div>

      {/* 고정된 버튼 크기 및 화살표 포함 */}
      <div className="flex items-center">
        {isReservation ? (
          // 예약 확정/취소 버튼
          <div className="flex justify-between relative pr-6">
            <div className="flex space-x-1">
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
              >
                확정
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors whitespace-nowrap"
              >
                취소
              </button>
            </div>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400">→</span>
          </div>
        ) : (
          // 단일 액션 버튼
          <div className="relative pr-6 group">
            <button
              onClick={handleAction}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis min-w-[120px]"
            >
              {actionText || "처리하기"}
            </button>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationActionButton;