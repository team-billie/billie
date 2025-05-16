// components/ActionButton.tsx
import React from 'react';
import Image from 'next/image';

interface ActionButtonProps {
  type: 'payment' | 'return' | 'reservation';
  userName: string;
  userDetail: string;
  onAction: (actionType?: string) => void;
  productImage?: string;
  profileImage?: string;
  buttonText?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  type, 
  userName, 
  userDetail, 
  onAction,
  productImage = '/icons/icon72.png', 
  profileImage = '/images/profileimg.png', 
  buttonText
}) => {

  const getButtonText = () => {
    if (buttonText) return buttonText;
    
    switch(type) {
      case 'payment': return '결제요청';
      case 'return': return '안심 반납 처리';
      case 'reservation': return '';
      default: return '결제요청';
    }
  };

  // 타입에 따라 버튼 렌더링
  const renderButton = () => {
    switch(type) {
      case 'payment':
      case 'return':
        return (
          <div className="flex items-center">
            <button 
              onClick={() => onAction()} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {getButtonText()}
            </button>
            <span className="ml-2 text-gray-400">→</span>
          </div>
        );
      case 'reservation':
        return (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onAction('confirm')} 
              className="bg-blue-500 text-white px-3 py-2 rounded-md"
            >
              확정
            </button>
            <button 
              onClick={() => onAction('cancel')} 
              className="bg-blue-500 text-white px-3 py-2 rounded-md"
            >
              취소
            </button>
            <span className="ml-2 text-gray-400">→</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-3">
      <div className="relative mr-3">
        <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-200">
          <Image
            src={productImage}
            alt={`${userName}의 상품`}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        {/* 프로필 이미지 (오버레이) */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-white">
          <Image
            src={profileImage}
            alt={`${userName}의 프로필`}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* 사용자 정보 */}
      <div className="flex-1">
        <p className="font-medium">{userName}</p>
        <p className="text-sm opacity-80">{userDetail}</p>
      </div>
      
      {renderButton()}
    </div>
  );
};

export default ActionButton;