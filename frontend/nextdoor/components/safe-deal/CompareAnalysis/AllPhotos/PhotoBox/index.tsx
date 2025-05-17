"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface PhotoBoxProps {
  images: string[];
  status: "before" | "after";
}

export default function PhotoBox({ images, status }: PhotoBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const title = status === "before" ? "대여일 물품사진 " : "반납일 물품 사진";
  return (
    <div className="w-full relative h-64 p-2 mb-6">
      <div className="text-gray400">{title}</div>
      {/* 이미지 슬라이더 */}
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-64 h-64">
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
    </div>
  );
}
