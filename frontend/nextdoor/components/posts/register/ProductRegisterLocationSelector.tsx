// components/posts/register/ProductRegisterLocationSelector.tsx
"use client";

import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LocationType } from "@/types/posts/request";

/**
 * 거래 희망 장소 선택 컴포넌트
 *
 * @param {string} value - 선택된 위치 값
 * @param {function} onChange - 값 변경 시 호출될 함수
 */
interface ProductRegisterLocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductRegisterLocationSelector({
  value,
  onChange,
}: ProductRegisterLocationSelectorProps) {
  const router = useRouter();

  // LocalStorage에서 위치 정보 가져오기
  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      onChange(storedLocation);
      localStorage.removeItem("selectedLocation");
    }
  }, [onChange]);

  // 위치 선택 화면으로 이동
  const handleLocationSelect = () => {
    router.push("/posts/register/map");
  };

  return (
    <div
      className="w-full bg-gray-100 rounded-md flex items-center justify-between p-4 cursor-pointer"
      onClick={handleLocationSelect}
      role="button"
      aria-label="거래 희망 장소 선택"
    >
      {/* 선택된 위치 또는 안내 메시지 */}
      <span className={`${value ? "text-gray-900" : "text-gray-500"}`}>
        {value || "위치 추가"}
      </span>

      {/* 오른쪽 화살표 아이콘 */}
      <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
    </div>
  );
}
