"use client";

import { ShoppingCart } from "lucide-react";

interface ProductPriceProps {
  deposit: number;
  rentalFee: number;
}

export default function ProductPrice({
  deposit,
  rentalFee,
}: ProductPriceProps) {
  return (
    <div className="mt-8">
      <div className="flex gap-2 my-2 ">
        <ShoppingCart className="bg-blue-100 text-blue400 rounded-full p-1.5 w-8 h-8" />
        <div className="text-2xl text-blue400">Price</div>
      </div>
      <div>
        <span>대여료 </span>
        <span className="text-xl">{rentalFee}원</span>
        <span> / 일</span>
      </div>
      <div>
        <span>보증금 </span>
        <span className="text-xl">{deposit}원</span>
      </div>
      <div className="h-0.5 w-full bg-gray200 my-2"></div>
    </div>
  );
}
