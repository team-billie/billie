"use client";

import { ChevronLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function ProductPhotos() {
  const images = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const width = carouselRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setCurrentIndex(index);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-full relative h-64">
      {/* 상단 버튼 */}
      <div className="absolute top-2 left-2 right-2 flex justify-between z-10 px-2">
        <Link href="/home">
          <ChevronLeft className="bg-gray200 rounded-full text-gray700 w-8 h-8 p-1.5 " />
        </Link>
        <div>
          <button>
            <Heart className="bg-gray200 rounded-full text-gray700 w-8 h-8 p-1.5" />
          </button>
        </div>
      </div>
      {/* 이미지 슬라이더 */}
      <div
        ref={carouselRef}
        className="carousel  w-full h-full snap-x overflow-x-auto scroll-smooth relative"
      >
        {images.map((image, idx) => (
          <div key={idx} className="carousel-item w-full snap-center">
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`Product photo ${idx + 1}`}
            />
          </div>
        ))}
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1  flex items-center gap-2 h-4">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-3 h-3 bg-white" : "w-2 h-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
