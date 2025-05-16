import React, { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface AccordionProps {
  title: ReactNode; // 헤더 부분 (항상 보이는 부분)
  children: ReactNode; // 확장 시 보이는 내용
  className?: string;
  defaultExpanded?: boolean;
  
  // 제품 정보 표시용 추가 props
  productInfo?: {
    postImageUrl?: string;
    title?: string;
    rentalFee?: number;
    deposit?: number;
    chatStatus?: string;
  };
  showProductInfo?: boolean; // 제품 정보 표시 여부
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  className = '',
  defaultExpanded = false,
  productInfo,
  showProductInfo = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`bg-white border-b ${className}`}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">{title}</div>
        <button 
          className="p-1"
          aria-label={isExpanded ? '접기' : '펼치기'}
        >
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          {/* 제품 정보 표시 */}
          {showProductInfo && productInfo && (
            <div className="flex items-center gap-4 mb-4">
              {/* 제품 이미지 */}
              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                <Image 
                  src={productInfo.postImageUrl || '/icons/icon72.png'} 
                  alt={productInfo.title || '제품 이미지'}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                {/* 제품 제목 */}
                <h3 className="text-md font-medium">
                  {productInfo.title || '다이슨 헤어 드라이기'}
                </h3>
                
                {/* 대여료 */}
                <p className="text-xs text-gray-600 mt-1">
                  대여료: {productInfo.rentalFee?.toLocaleString() || '20,000'}원/일
                </p>
                
                {/* 보증금 */}
                {productInfo.deposit && (
                  <p className="text-xs text-gray-600">
                    보증금: {productInfo.deposit.toLocaleString()}원
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* 기존 children 렌더링 */}
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;