import Image from "next/image";
import { useState } from "react";

interface ResultPhotoProps {
  status: "BEFORE" | "AFTER";
  imageUrl?: string;
}

export default function ResultPhoto({ status, imageUrl }: ResultPhotoProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이미지 로딩 실패 시 처리
  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageClick = () => {
    if (imageUrl && !imageError) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex-1 w-full">
      <div className="flex text-sm text-gray700 justify-center pb-1">
        {status}
      </div>

      {imageUrl && !imageError ? (
        <>
          <div 
            className="relative h-28 w-full rounded-md overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
              src={imageUrl}
              alt={`${status} 이미지`}
              fill
              className="object-cover"
              onError={handleImageError}
            />
          </div>

          {/* 모바일 최적화 이미지 모달 */}
          {isModalOpen && (
            <div 
              className="fixed inset-0 bg-black z-50 flex flex-col"
              onClick={() => setIsModalOpen(false)}
            >
              {/* 상단 닫기 버튼 */}
              <div className="absolute top-4 right-4 z-10">
                <button 
                  className="text-white text-lg font-bold p-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              {/* 이미지 컨테이너 */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-full relative">
                  <Image
                    src={imageUrl}
                    alt={`${status} 이미지`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          )}
        </>
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
