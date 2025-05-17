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
  actionText?: string;
  onAction?: () => void;
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
  actionText,
  onAction,
}) => {
  return (
    <div className="flex items-center bg-white rounded-2xl p-3 mb-3 border-l-4 border-red-300 shadow-sm">
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
                onClick={onConfirm}
                className="bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
              >
                확정
              </button>
              <button
                onClick={onCancel}
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
              onClick={onAction}
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