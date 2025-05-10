import Image from "next/image";
import { useState } from "react";
import { useTestUserStore } from "@/lib/store/useTestUserStore";

interface ImagePreviewProps {
  preview: string;
  status: string;
  onDelete?: () => void;
  isMultiple?: boolean;
  isServerImage?: boolean;
}

export default function ImagePreview({
  preview,
  status,
  onDelete,
  isMultiple = false,
  isServerImage = false,
}: ImagePreviewProps) {
  const { userId } = useTestUserStore();
  console.log("ImagePreview userId:", userId);

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  const [imageError, setImageError] = useState(false);

  // 이미지 로딩 실패 시 처리
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMultiple ? "120px" : "200px",
      }}
      className="rounded-md overflow-hidden group"
    >
      {imageError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <p className="text-gray-500 text-sm">이미지를 불러올 수 없습니다</p>
        </div>
      ) : (
        <Image
          src={preview}
          alt={`${status} 이미지`}
          fill
          style={{
            objectFit: "cover",
          }}
          unoptimized={isServerImage} // 서버 이미지는 Next.js 최적화를 건너뜀
          onError={handleImageError}
        />
      )}

      {/* 삭제 버튼 (서버 이미지는 삭제 버튼 없음) */}
      {!isServerImage && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="이미지 삭제"
        >
          ✕
        </button>
      )}
    </div>
  );
}
