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
  onChange: (value: string) => void;
}

interface CategoryInfo {
  type: CategoryType;
  displayName: CategoryDisplayName;
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
    { type: "DIGITAL_DEVICE", displayName: "디지털기기" },
    { type: "HOME_APPLIANCE", displayName: "생활가전" },
    { type: "FURNITURE_INTERIOR", displayName: "가구/인테리어" },
    { type: "LIVING_KITCHEN", displayName: "생활/주방" },
    { type: "BABY_CHILDREN", displayName: "유아동" },
    { type: "BABY_BOOK", displayName: "유아도서" },
    { type: "WOMEN_CLOTHING", displayName: "여성의류" },
    { type: "WOMEN_ACCESSORIES", displayName: "여성잡화" },
    { type: "MEN_FASHION_ACCESSORIES", displayName: "남성패션/잡화" },
    { type: "BEAUTY", displayName: "뷰티/미용" },
    { type: "SPORTS_LEISURE", displayName: "스포츠/레저" },
    { type: "HOBBY_GAMES_MUSIC", displayName: "취미/게임/음반" },
    { type: "BOOK", displayName: "도서" },
    { type: "TICKET_VOUCHER", displayName: "티켓/교환권" },
    { type: "PROCESSED_FOOD", displayName: "가공식품" },
    { type: "HEALTH_SUPPLEMENT", displayName: "건강기능식품" },
    { type: "PET_SUPPLIES", displayName: "반려동물용품" },
    { type: "PLANT", displayName: "식물" },
    { type: "ETC_USED_GOODS", displayName: "기타 중고물품" },
  ];
  // 선택된 카테고리의 표시 이름 가져오기
  const getDisplayName = (categoryType: string): string => {
    const found = categories.find(
      (cat) => cat.type === categoryType || cat.displayName === categoryType
    );
    return found ? found.displayName : "";
  };

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
          {localValue ? getDisplayName(localValue) : "카테고리 선택"}
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
                  {category.displayName}
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
