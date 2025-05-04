"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

/**
 * 거래 희망 장소 선택 컴포넌트
 * 
 * PWA 고려사항:
 * - 위치 권한 요청 및 관리
 * - 오프라인 지도 지원 방안
 * - 위치 데이터 캐싱 전략
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
  onChange
}: ProductRegisterLocationSelectorProps) {
  // 위치 서비스 사용 가능 여부
  const [locationAvailable, setLocationAvailable] = useState(true);
  
  // 위치 선택 화면으로 이동
  const handleLocationSelect = () => {
    // PWA에서는 위치 서비스 사용 가능 여부 확인 중요
    if ('geolocation' in navigator) {
      // 위치 권한 및 서비스 사용 가능
      // 실제 구현: 현재 위치 기반 주소 선택 화면으로 이동
      // 임시 예시
      onChange('부산광역시 부산진구');
    } else {
      // 위치 서비스 사용 불가
      setLocationAvailable(false);
      alert('위치 서비스를 사용할 수 없습니다.');
    }
  };

  return (
    <div 
      className="w-full bg-gray-100 rounded-md flex items-center justify-between p-4 cursor-pointer"
      onClick={handleLocationSelect}
      role="button"
      aria-label="거래 희망 장소 선택"
    >
      {/* 선택된 위치 또는 안내 메시지 */}
      <span className={`${value ? 'text-gray-900' : 'text-gray-500'}`}>
        {value || (locationAvailable ? "위치 추가" : "위치 서비스를 사용할 수 없습니다")}
      </span>
      
      {/* 오른쪽 화살표 아이콘 */}
      <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
    </div>
  );
}