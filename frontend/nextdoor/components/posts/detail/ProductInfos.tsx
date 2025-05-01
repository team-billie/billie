"use client";

import { Heart } from "lucide-react";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import ProductLocation from "./ProductLocation";

export default function ProductInfos() {
  return (
    <div className="w-full h-full p-3">
      <div className="py-2">
        <div className="text-2xl ">다이슨 헤어드라이기</div>
        {/* 관심/거래 */}
        <div className="flex float-end gap-2 p-2 text-white">
          <div className="bg-blue400 pr-2 flex gap-2">
            <Heart className="p-1" />
            관심 등록 수 5
          </div>
          <div className="bg-blue400 px-2 flex gap-2">$ 총 거래 횟수 5</div>
        </div>
      </div>
      {/* 상품 가격 */}
      <ProductPrice />
      {/* 설명 */}
      <ProductDescription />
      {/* 위치 */}
      <ProductLocation />
      {/* 판매자 정보 */}
      <div className="flex">
        <div className="flex gap-3">
          <div className="w-12 h-12 m-auto rounded-full  bg-gray600"></div>
          <div>
            <div className="text-lg">익재 마켓</div>
            <div className="text-gray600">판매 경력 1년</div>
          </div>
        </div>
      </div>
    </div>
  );
}
