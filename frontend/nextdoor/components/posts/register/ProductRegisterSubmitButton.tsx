"use client";

interface Props {
  onClick: () => void;
}

export default function ProductRegisterSubmitButton({ onClick }: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
      <button 
        className="w-full py-4 bg-blue-500 text-white rounded-full font-medium"
        onClick={onClick}
        aria-label="상품 등록 완료"
      >
        작성 완료
      </button>
    </div>
  );
}