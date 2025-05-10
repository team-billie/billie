import { useState } from "react";

interface ResultPhotoProps {
  status: "BEFORE" | "AFTER";
  imageUrl?: string;
}

export default function ResultPhoto({ status, imageUrl }: ResultPhotoProps) {
  const [imageError, setImageError] = useState(false);

  // 이미지 로딩 실패 시 처리
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="flex-1 w-full">
      <div className="flex text-sm text-gray700 justify-center pb-1">
        {status}
      </div>

      {imageUrl && !imageError ? (
        <div className="relative h-28 w-full rounded-md overflow-hidden">
          {/* Next.js Image 컴포넌트 대신 img 태그 사용 (CSP 이슈 방지) */}
          <img
            src={imageUrl}
            alt={`${status} 이미지`}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
      ) : (
        <div className="bg-slate-600 h-28 w-full rounded-md flex items-center justify-center">
          {imageError ? (
            <p className="text-white text-xs">이미지를 불러올 수 없습니다</p>
          ) : (
            <p className="text-white text-xs">이미지 없음</p>
          )}
        </div>
      )}
    </div>
  );
}
