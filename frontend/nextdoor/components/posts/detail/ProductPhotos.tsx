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
  // const images = [
  //   "https://picsum.photos/id/1018/600/400",
  //   "https://picsum.photos/id/1025/600/400",
  //   "https://picsum.photos/id/1035/600/400",
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full relative h-64">
      {/* 상단 버튼 */}
      

      {/* 이미지 슬라이더 */}
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-64">
                <Image
                  src={image}
                  alt={`상품 이미지 ${idx + 1}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="relative w-full h-64 flex items-center justify-center bg-gray-100 rounded-xl">
              <span className="text-gray-400">이미지가 없습니다</span>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
