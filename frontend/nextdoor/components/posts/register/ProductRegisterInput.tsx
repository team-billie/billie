"use client";

import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

/**
 * 상품 등록 폼의 공통 입력 컴포넌트
 * 
 * 여러 타입의 입력 필드를 지원하는 범용 컴포넌트
 * - text: 일반 텍스트 입력 (제목)
 * - textarea: 다중 라인 텍스트 입력 (설명)
 * - price: 가격 입력 (원화 심볼 포함)
 * - select: 선택 입력 (보증금, 위치 등)
 * 
 * @param {string} type - 입력 필드 타입 (text, textarea, price, select)
 * @param {string} value - 입력 필드 값
 * @param {string} placeholder - 입력 필드 placeholder
 * @param {function} onChange - 값 변경 시 호출될 함수
 * @param {ReactNode} icon - 우측에 표시할 아이콘 (선택적)
 * @param {function} onClick - 클릭 시 호출될 함수 (선택형 필드용)
 * @returns {JSX.Element} 입력 컴포넌트
 */
interface ProductRegisterInputProps {
  type: 'text' | 'textarea' | 'price' | 'select';
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  maxLength?: number;
  icon?: ReactNode;
  onClick?: () => void;
  readOnly?: boolean;
}

export default function ProductRegisterInput({
  type,
  value,
  placeholder,
  onChange,
  maxLength,
  icon,
  onClick,
  readOnly = false
}: ProductRegisterInputProps) {
  // 숫자만 입력되도록 처리하는 핸들러 (가격 필드용)
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아닌 문자 제거
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    onChange(onlyNums);
  };

  // 일반 입력 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  // 입력 필드 타입에 따라 다른 컴포넌트 렌더링
  switch (type) {
    case 'text':
      return (
        <input
          type="text"
          className="w-full p-4 bg-gray-100 rounded-md text-gray-900 placeholder-gray-400"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          readOnly={readOnly}
        />
      );
      
    case 'textarea':
      return (
        <textarea
          className="w-full p-4 bg-gray-100 rounded-md text-gray-900 placeholder-gray-400 min-h-[150px] resize-none"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
      );
      
    case 'price':
      return (
        <div className="relative">
          {/* 원화 기호 */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500">₩</span>
          </div>
          
          {/* 가격 입력 필드 */}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full pl-10 p-4 bg-gray-100 rounded-md text-gray-900"
            placeholder={placeholder}
            value={value}
            onChange={handlePriceChange}
          />
        </div>
      );
      
    case 'select':
      return (
        <div 
          className="w-full bg-gray-100 rounded-md flex items-center justify-between p-4 cursor-pointer"
          onClick={onClick}
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value || placeholder}
          </span>
          {icon || <ChevronRight className="w-5 h-5 text-gray-400" />}
        </div>
      );
      
    default:
      return null;
  }
}