"use client";

import { useState, useEffect } from "react";

interface ProductRegisterAiToggleProps {
  isAiToggle: boolean;
  toggleSwitch: () => void;
}

export default function ProductRegisterAiToggle({ 
  isAiToggle = false, 
  toggleSwitch 
}: ProductRegisterAiToggleProps) {
  return (
    <div className="bg-blue-300 rounded-full flex items-center justify-between p-3 my-4 mx-4">
      <div className="flex items-center gap-2">
        <span className="text-white font-bold">AI로 작성하기</span>
      </div>
      <button
        className="relative inline-flex items-center h-6 rounded-full w-12 focus:outline-none touch-manipulation"
        onClick={toggleSwitch}
        aria-pressed={isAiToggle} 
        aria-label={`AI 작성 ${isAiToggle ? "사용 중" : "사용 안함"}`}
      >
        <span
          className={`${
            isAiToggle ? "bg-blue-500" : "bg-gray-200" 
          } absolute h-6 w-12 mx-auto rounded-full transition-colors duration-300 ease-in-out`} 
        />
        
        <span
          className={`${
            isAiToggle ? "translate-x-6" : "translate-x-1" 
          } inline-block h-4 w-4 rounded-full bg-white transform transition-transform duration-300 ease-in-out`} 
        />
      </button>
    </div>
  );
}