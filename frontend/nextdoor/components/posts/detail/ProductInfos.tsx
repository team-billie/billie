"use client";

import { Heart } from "lucide-react";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import ProductLocation from "./ProductLocation";

export interface ProductInfosProps {
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
  address: string;
  category: string;
  nickname: string;
}

export default function ProductInfos({
  title,
  content,
  rentalFee,
  deposit,
  address,
  category,
  nickname,
}: ProductInfosProps) {
  return (
    <div className="w-full h-full p-3">
      <div className="py-2">
        <div className="text-2xl ">{title}</div>
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
      <ProductPrice deposit={deposit} rentalFee={rentalFee} />
      {/* 설명 */}
      <ProductDescription content={content} />
      {/* 위치 */}
      <ProductLocation address={address} />
      {/* 판매자 정보 */}
      <div className="flex">
        <div className="flex gap-3">
          <div className="w-12 h-12 m-auto rounded-full  bg-gray600"></div>
          <div>
            <div className="text-lg">{nickname}</div>
            <div className="text-gray600">판매 경력 1년</div>
          </div>
        </div>
      </div>
    </div>
  );
}
