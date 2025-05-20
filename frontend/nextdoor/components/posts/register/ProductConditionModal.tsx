"use client";

import { useState } from "react";

export type ProductCondition = 
  | "미개봉"
  | "거의 새 제품"
  | "양호"
  | "보통"
  | "사용감 있음"
  | "수리 필요함";

interface ProductConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (condition: ProductCondition) => void;
  selectedCondition: ProductCondition | null;
}

export default function ProductConditionModal({
  isOpen,
  onClose,
  onConfirm,
  selectedCondition,
}: ProductConditionModalProps) {
  const conditions: ProductCondition[] = [
    "미개봉",
    "거의 새 제품",
    "양호",
    "보통",
    "사용감 있음",
    "수리 필요함",
  ];

  const [localSelectedCondition, setLocalSelectedCondition] = useState<ProductCondition | null>(selectedCondition);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">상품 상태 확인</h3>
        <p className="text-gray-600 mb-4">AI가 분석한 상품 상태가 맞나요?</p>
        
        <div className="space-y-2 mb-6">
          {conditions.map((condition) => (
            <button
              key={condition}
              className={`w-full p-3 rounded text-left ${
                localSelectedCondition === condition
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setLocalSelectedCondition(condition)}
            >
              {condition}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 p-2 bg-gray-200 text-gray-800 rounded-md font-medium"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="flex-1 p-2 bg-blue-500 text-white rounded-md font-medium"
            onClick={() => {
              if (localSelectedCondition) {
                onConfirm(localSelectedCondition);
              }
            }}
            disabled={!localSelectedCondition}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
} 