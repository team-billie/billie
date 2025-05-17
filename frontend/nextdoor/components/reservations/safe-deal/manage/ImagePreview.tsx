import useUserStore from "@/lib/store/useUserStore";
import Image from "next/image";
import { useState } from "react";

interface ImagePreviewProps {
  preview: string;
  status: string;
  isMultiple?: boolean;
  isServerImage?: boolean;
}

export default function ImagePreview({
  preview,
  status,
  isMultiple = false,
  isServerImage = false,
}: ImagePreviewProps) {
  const { userId } = useUserStore();

  // userId 없으면 렌더링 X
  if (!userId) return null;

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`relative rounded-md overflow-hidden ${
        isMultiple ? "h-[120px]" : "h-[200px]"
      } w-full`}
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
          className="object-cover"
          unoptimized={isServerImage}
          onError={handleImageError}
        />
      )}
    </div>
  );
}
