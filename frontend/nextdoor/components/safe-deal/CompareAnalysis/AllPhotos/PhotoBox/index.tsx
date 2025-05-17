"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface PhotoBoxProps {
  images: string[];
  status: "before" | "after";
}

export default function PhotoBox({ images, status }: PhotoBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const title = status === "before" ? "대여일 물품사진 " : "반납일 물품 사진";
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
            <div className="relative w-full h-44">
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
