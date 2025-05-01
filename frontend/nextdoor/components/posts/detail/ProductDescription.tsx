"use client";

import { TriangleAlert } from "lucide-react";

export default function ProductDescription() {
  return (
    <div className="my-4">
      <div className="flex gap-2 my-2 ">
        <TriangleAlert className="bg-blue-100 text-blue400 rounded-full p-1.5 w-8 h-8" />
        <div className="text-2xl text-blue400">Description</div>
      </div>
      <div className="text-gray800">
        다이슨 슈퍼소닉 헤어 드라이어 렌탈합니다. 상태 아주 깨끗하고 기본 구성품
        모두 갖추고 있습니다. 단기간 사용이나 특별한 날 필요하신 분들
        추천드려요, 가격과 대여 기간은 협의 가능하며, 만나서 대여합니다.
        필요하신 분은 편하게 연락 주세요!
      </div>
      <div className="h-0.5 w-full bg-gray200 my-2"></div>
    </div>
  );
}
