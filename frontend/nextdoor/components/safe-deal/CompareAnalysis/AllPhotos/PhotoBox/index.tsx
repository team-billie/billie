"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { stat } from "fs";

interface PhotoBoxProps {
  images: string[];
  status: "before" | "after" | null;
}

export default function PhotoBox({ images, status }: PhotoBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const title = useMemo(() => {
    if (status === "before") return "대여일 물품 사진";
    if (status === "after") return "반납일 물품 사진";
    return "";
  }, [status]);

  return (
    <div className="w-full relative  mb-4">
      <div className="text-gray400 my-2">{title}</div>
      {/* 이미지 슬라이더 */}
      <Swiper
        slidesPerView={2.4}
        spaceBetween={8}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="mySwiper"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative w-full h-44 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Product ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* ✅ 전체 화면 확대 이미지 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[90vw] max-w-3xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="확대된 이미지"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
