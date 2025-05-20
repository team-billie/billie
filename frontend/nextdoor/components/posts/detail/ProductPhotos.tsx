"use client";

import { PostLikeRequest } from "@/lib/api/posts";
import { PostLikeDeleteRequest } from "@/lib/api/posts";
import { ChevronLeft, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductPhotosProps {
  images: string[];
}

export default function ProductPhotos({ images }: ProductPhotosProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full relative h-72   "> {/* 높이 변경 */}
      {/* 이미지 슬라이더 */}
      <Swiper 
        spaceBetween={0}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-72 "> {/* 높이 변경 */}
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