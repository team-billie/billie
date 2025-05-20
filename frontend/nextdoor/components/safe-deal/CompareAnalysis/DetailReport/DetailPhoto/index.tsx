"use client";

import Image from "next/image";
import { BoundingBox } from "@/types/ai-analysis/response";
import { useState } from "react";

interface DetailPhotoProps {
  imageUrl: string;
  idx: number;
  boundingBox?: BoundingBox;
}

export default function DetailPhoto({
  imageUrl,
  idx,
  boundingBox,
}: DetailPhotoProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <>
      <div
        className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray400 cursor-pointer"
        onClick={() => setSelectedImage(imageUrl)}
      >
        <div className="relative w-full h-full rounded-2xl">
          <Image
            src={imageUrl}
            alt={`Product ${idx}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transform"
            priority={idx === 1}
            style={boundingBox ? getZoomedStyle(boundingBox) : undefined}
          />
        </div>
      </div>

      {/* ✅ 전체 화면 확대 이미지 - PhotoBox와 동일한 스타일 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[90vw] max-w-3xl h-[80vh] rounded-2xl">
            <Image
              src={selectedImage}
              alt="확대된 이미지"
              fill
              className="object-contain rounded-lg"
              style={
                boundingBox ? getZoomedStyle(boundingBox, true) : undefined
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
