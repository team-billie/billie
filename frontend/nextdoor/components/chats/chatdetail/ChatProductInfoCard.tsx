import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import ChatStatusIcon from '@/components/chats/list/ChatStatusIcon';

interface ProductInfoCardProps {
  productInfo: {
    postImageUrl?: string;
    title?: string;
    rentalFee?: number;
    deposit?: number;
    chatStatus?: string;
  };
  onReservationClick?: () => void;
  onDetailClick?: () => void;
}

const ProductInfoCard: React.FC<ProductInfoCardProps> = ({ 
  productInfo,
  onReservationClick = () => {},
  onDetailClick = () => {}
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3 border border-gray-100">
      <div className="flex p-3 items-center">
        {/* 제품 이미지 */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden mr-4 flex-shrink-0 bg-gray-200">
          <Image
            src={productInfo?.postImageUrl || '/icons/icon72.png'}
            alt={productInfo?.title || '제품 이미지'}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          {/* 제품 제목과 상태 */}
          <div className="flex items-center mb-1 ">
            <h3 className="text-lg font-semibold text-gray-800 truncate mr-2">
              {productInfo?.title || '제품명'}
            </h3>
            
            {productInfo?.chatStatus && productInfo.chatStatus !== "상태없음" && (
              <div className="flex items-center">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  productInfo.chatStatus === "거래중" 
                    ? "bg-blue-100 text-blue-700" 
                    : productInfo.chatStatus === "예약중"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                }`}>
                  {productInfo.chatStatus}
                </span>
                <ChatStatusIcon status={productInfo.chatStatus} className="ml-1" />
              </div>
            )}
          </div>
          
          {/* 가격 정보 */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              일 {productInfo?.rentalFee?.toLocaleString() || '0'}원
            </div>
            {productInfo?.deposit && (
              <div className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                보증금 {productInfo.deposit.toLocaleString()}원
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 버튼 영역 */}
      <div className="flex px-3 py-2 bg-gray-50 border-t border-gray-100">
        <button 
          onClick={onDetailClick}
          className="flex-1 flex items-center justify-center py-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ExternalLink size={16} className="mr-1" />
          상세보기
        </button>
        <div className="w-px bg-gray-200 mx-2"></div>
        {/* <button 
          onClick={onReservationClick}
          className="flex-1 rounded-lg py-1.5 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          예약 요청하기
        </button> */}
      </div>
    </div>
  );
};

export default ProductInfoCard;