// components/ReservationActionButton.tsx
import React from 'react';
import Image from 'next/image';

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
  productImage = '/icons/icon72.png',
  profileImage = '/images/profileimg.png',
  onConfirm,
  onCancel,
  isReservation = false,
  actionText,
  onAction
}) => {
  return (
    <div 
      className="flex items-center bg-white rounded-2xl p-4 mb-4 border-l-4 border-red-300 shadow-sm"
    >
      <div className="relative mr-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-200">
          <Image
            src={productImage}
            alt={title}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-white">
          <Image
            src={profileImage}
            alt="프로필"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <p className="font-semibold text-black text-base mb-1">예약요청</p>
        <p className="text-sm text-gray-500 truncate">{detail || title}</p>
      </div>
      
      {isReservation ? (
        <div className="flex items-center" style={{ width: '180px' }}>
          <div className="flex space-x-2 w-full justify-between">
            <button 
              onClick={onConfirm} 
              className="bg-blue-500 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors flex-1"
            >
              확정
            </button>
            <button 
              onClick={onCancel} 
              className="bg-gray-500 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors flex-1"
            >
              취소
            </button>
          </div>
          <span className="ml-3 text-gray-400">→</span>
        </div>
      ) : (
        <div className="flex items-center" style={{ width: '170px' }}>
          <button 
            onClick={onAction}
            className="bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors w-full"
          >
            {actionText || '처리하기'}
          </button>
          <span className="ml-3 text-gray-400">→</span>
        </div>
      )}
    </div>
  );
};

export default ReservationActionButton;