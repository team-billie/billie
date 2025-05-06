// app/location-select/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KakaoMap from "@/components/posts/register/map/KakaoMap";

export default function LocationSelectPage() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  
  // 위치 선택 완료 처리
  const handleSelectLocation = () => {
    if (selectedAddress) {
      // 이전 페이지로 선택된 위치 전달
      localStorage.setItem('selectedLocation', selectedAddress);
      router.back();
    } else {
      alert('위치를 선택해주세요.');
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <div className="bg-blue-500 text-white py-4 px-4 flex items-center">
        <button 
          onClick={() => router.back()} 
          className="mr-4"
          aria-label="뒤로 가기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-lg font-medium">거래 희망 장소</h1>
      </div>
      
      {/* 안내 텍스트 */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">이웃과 만나서</h2>
        <h2 className="text-xl font-semibold">거래하고 싶은 장소를 선택해주세요.</h2>
        <p className="text-gray-600 mt-2">만나서 거래할 때는 누구나 찾기 쉬운 공공장소가 좋아요.</p>
      </div>
      
      {/* 지도 */}
      <div className="flex-1 relative">
        <KakaoMap onAddressSelect={setSelectedAddress} />
        
        {/* 위치 선택 안내 팝업 */}
        {selectedAddress && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-70 text-white px-4 py-3 rounded-md">
            <p>지도를 움직여서 선택해보세요.</p>
          </div>
        )}
      </div>
      
      {/* 선택 완료 버튼 */}
      <div className="p-4 bg-white">
        <button 
          className="w-full py-4 bg-blue-500 text-white rounded-full font-medium"
          onClick={handleSelectLocation}
        >
          선택 완료
        </button>
      </div>
    </div>
  );
}