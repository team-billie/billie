import Image from "next/image";
import { BoundingBox } from "@/types/ai-analysis/response";
import { useState } from "react";

interface DetailPhoto {
  imageUrl: string;
  idx: number;
  boundingBox?: BoundingBox;
}

export default function DetailPhoto({
  imageUrl,
  idx,
  boundingBox,
}: DetailPhoto) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // boundingBox 영역을 중심으로 확대된 스타일 계산
  const getZoomedStyle = (box: BoundingBox, isModal: boolean = false) => {
    const width = box.xMax - box.xMin;
    const height = box.yMax - box.yMin;
    // 원래 크기의 3배로 확대
    const baseScale = 3;
    // 모달일 때는 더 크게 확대
    const scale = baseScale * (isModal ? 1.5 : 1);

    const translateX = -(box.xMin + width / 2) * 100 + 50;
    const translateY = -(box.yMin + height / 2) * 100 + 50;

    return {
      transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
      transformOrigin: "center",
    };
  };

  const renderImage = (isModal: boolean = false) => {
    const transformStyle = boundingBox
      ? getZoomedStyle(boundingBox, isModal)
      : undefined;

    return (
      <div className="relative w-full h-full rounded-2xl">
        <Image
          src={imageUrl}
          alt={`Product ${idx}${isModal ? " enlarged" : ""}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transform"
          priority={idx === 1}
          style={transformStyle}
        />
      </div>
    );
  };

  return (
    <>
      <div
        className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray400 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {renderImage()}
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-[90vw] h-[90vh] max-w-4xl overflow-hidden">
            {renderImage(true)}
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
