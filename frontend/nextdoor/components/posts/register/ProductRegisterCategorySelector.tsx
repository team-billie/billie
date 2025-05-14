"use client";

import useProductRegisterStore from "@/lib/store/posts/useProductRegisterStore";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * 카테고리 선택 컴포넌트
 *
 * @param {string} value - 선택된 카테고리 값
 * @param {function} onChange - 값 변경 시 호출될 함수
 */
interface ProductRegisterCategorySelectorProps {
  value: string;
  onChange: (value: CategoryType) => void;
}

interface CategoryInfo {
  type: CategoryType;
}

export default function ProductRegisterCategorySelector({
  value,
  onChange,
}: ProductRegisterCategorySelectorProps) {
  // 전역 상태 사용
  const { category, setCategory } = useProductRegisterStore();

  // 카테고리 선택 모달 상태
  const [showModal, setShowModal] = useState(false);

  // 로컬 상태와 전역 상태 동기화
  const [localValue, setLocalValue] = useState(value || category);

  // 전역 상태가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setLocalValue(value || category);
  }, [value, category]);

  // 카테고리 목록
  const categories: CategoryInfo[] = [
    { type: "디지털기기" },
    { type: "생활가전" },
    { type: "가구/인테리어" },
    { type: "생활/주방" },
    { type: "유아동" },
    { type: "유아도서" },
    { type: "여성의류" },
    { type: "여성잡화" },
    { type: "남성패션/잡화" },
    { type: "뷰티/미용" },
    { type: "스포츠/레저" },
    { type: "취미/게임/음반" },
    { type: "도서" },
    { type: "티켓/교환권" },
    { type: "가공식품" },
    { type: "건강기능식품" },
    { type: "반려동물용품" },
    { type: "식물" },
    { type: "기타 중고물품" },
  ];

  // 카테고리 선택 화면 열기
  const handleOpenCategorySelector = () => {
    setShowModal(true);
  };

  // 카테고리 선택 처리
  const handleSelectCategory = (categoryType: CategoryType) => {
    // 로컬 상태 업데이트 - 영문 타입으로 저장
    setLocalValue(categoryType);

    // 전역 상태 업데이트 - 영문 타입으로 저장
    setCategory(categoryType);

    // 부모 컴포넌트에 변경 알림 - 영문 타입으로 전달
    onChange(categoryType);

    // 모달 닫기
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
        {/* 선택된 카테고리 또는 안내 메시지 - 화면에는 한글로 표시 */}
        <span className={`${localValue ? "text-gray-900" : "text-gray-500"}`}>
          {localValue ? category : "카테고리 선택"}
        </span>

        {/* 화살표 아이콘 */}
        <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </div>

      {/* 카테고리 선택 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-80 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">카테고리 선택</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.type}
                  className={`p-3 rounded cursor-pointer ${
                    localValue === category.type
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectCategory(category.type)}
                  role="option"
                  aria-selected={localValue === category.type}
                >
                  {category.type}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full p-2 bg-gray-200 text-gray-800 rounded-md font-medium"
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
