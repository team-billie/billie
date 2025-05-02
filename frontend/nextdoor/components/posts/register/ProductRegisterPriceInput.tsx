// ProductRegisterPriceInput.tsx
"use client";

/**
 * 가격 입력 컴포넌트 - 숫자만 입력 가능
 * 
 * @param {string} value - 입력된 가격 값
 * @param {function} onChange - 값 변경 시 호출될 함수
 * @param {string} placeholder - 플레이스홀더 텍스트
 * @returns {JSX.Element} 가격 입력 컴포넌트
 */
interface ProductRegisterPriceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ProductRegisterPriceInput({
  value,
  onChange,
  placeholder = "가격 입력"
}: ProductRegisterPriceInputProps) {
  // 숫자만 입력되도록 처리하는 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아닌 문자 모두 제거
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(numericValue);
  };

  // 표시용 가격 포맷팅 (천 단위 콤마) - 선택적 기능
  const formattedForDisplay = value ? 
    parseInt(value).toLocaleString('ko-KR') : 
    value;

  return (
    <div className="relative">
      {/* 원화 기호 */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-gray-500">₩</span>
      </div>
      
      {/* 가격 입력 필드 */}
      <input
        type="text"
        inputMode="numeric" // 모바일에서 숫자 키패드 표시
        pattern="[0-9]*" // 숫자만 입력 가능하도록 패턴 설정
        className="w-full pl-10 p-4 bg-gray-100 rounded-md text-gray-900"
        placeholder={placeholder}
        value={value} // 또는 formattedForDisplay 사용 가능
        onChange={handleChange}
      />
    </div>
  );
}