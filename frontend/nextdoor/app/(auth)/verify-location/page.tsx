"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VerifyGoogleMap from "@/components/(auth)/VerifyGoogleMap";

export default function VerifyLocationPage() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  
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
  
  // 주소가 선택되었을 때 팝업 표시
  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    
    // 팝업 표시
    setShowPopup(true);
    
    // 3초 후 팝업 자동 숨김
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    
    return () => clearTimeout(timer);
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
        
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium">동네 인증 하기</h1>
      </div>
      
      {/* 안내 텍스트 */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">이웃과 만나서</h2>
        <h2 className="text-xl font-semibold">거래하고 싶은 장소를 선택해주세요.</h2>
        <p className="text-gray-600 mt-2">만나서 거래할 때는 누구나 찾기 쉬운 공공장소가 좋아요.</p>
      </div>
      
      {/* 지도 */}
      <div className="flex-1 relative">
        <VerifyGoogleMap 
          onAddressSelect={handleAddressSelect} 
        />
      </div>
      
      {/* 선택 완료 버튼 */}
      <div className="p-4 bg-white">
        <button 
          className={`w-full py-4 rounded-full font-medium ${selectedAddress ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
          onClick={handleSelectLocation}
          disabled={!selectedAddress}
        >
          선택 완료
        </button>
      </div>
    </div>
  );
}