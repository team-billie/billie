"use client";

// 제목, 내용에 사용 
interface ProductRegisterTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string; // 입력창 안내 문구 
  multiline?: boolean;
  maxLength?: number;
}

export default function ProductRegisterTextInput({
  value,
  onChange,
  placeholder,
  multiline = false,
  maxLength
}: ProductRegisterTextInputProps) {
  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  if (multiline) {
    return (
      <textarea
        className="w-full p-4 bg-gray-100 rounded-md text-gray-900 placeholder-gray-400 min-h-[150px] resize-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        aria-label={placeholder}
      />
    );
  }
  
  return (
    <input
      type="text"
      className="w-full p-4 bg-gray-100 rounded-md text-gray-900 placeholder-gray-400"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      aria-label={placeholder}
    />
  );
}