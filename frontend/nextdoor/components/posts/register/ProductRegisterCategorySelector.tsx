"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

/**
 * 카테고리 선택 컴포넌트
 * 
 * @param {string} value - 선택된 카테고리 값
 * @param {function} onChange - 값 변경 시 호출될 함수
 */
interface ProductRegisterCategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductRegisterCategorySelector({
  value,
  onChange
}: ProductRegisterCategorySelectorProps) {
  // 카테고리 선택 모달 상태
  const [showModal, setShowModal] = useState(false);
  
  // 카테고리 목록 - 더미
  const categories = [
    "디지털/가전", "스포츠/레저", "도서", "의류/잡화",
    "뷰티/미용", "가구/인테리어", "생활용품", "기타"
  ];
  
  // 카테고리 선택 화면 열기
  const handleOpenCategorySelector = () => {
    setShowModal(true);
  };
  
  // 카테고리 선택 처리
  const handleSelectCategory = (category: string) => {
    onChange(category);
    setShowModal(false);
  };

  return (
    <>
      <div 
        className="w-full bg-gray-100 rounded-md flex items-center justify-between p-4 cursor-pointer"
        onClick={handleOpenCategorySelector}
        role="button"
        aria-label="카테고리 선택"
      >
        {/* 선택된 카테고리 또는 안내 메시지 */}
        <span className={`${value ? 'text-gray-900' : 'text-gray-500'}`}>
          {value || "카테고리 선택"}
        </span>
        
        {/* 화살표 아이콘 */}
        <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </div>
      
      {/* 카테고리 선택 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-300 rounded-lg p-4 w-80 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">카테고리 선택</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li 
                  key={category}
                  className="p-3 hover:bg-gray-400 rounded cursor-pointer"
                  onClick={() => handleSelectCategory(category)}
                  role="option"
                  aria-selected={value === category}
                >
                  {category}
                </li>
              ))}
            </ul>
            <button 
              className="mt-4 w-full p-2 bg-blue-400 rounded"
              onClick={() => setShowModal(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </>
  );
}