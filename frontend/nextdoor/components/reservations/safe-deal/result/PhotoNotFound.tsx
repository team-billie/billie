"use client";

import Image from "next/image";
import blueStar from "@/public/images/blueStar.png";
import { DollarSign } from "lucide-react";

export default function PhotoNotFound() {
  return (
    <div className="relative w-full h-full  flex flex-col gap-2 items-center justify-center rounded-2xl shadow-lg border-gray200 border ">
      <div className="absolute left-4 top-4 gap-2 flex items-center">
        <div className="bg-blue100 p-1 rounded-lg">
          <DollarSign className="  text-blue300 rounded-all" />
        </div>
        <div className="text-gray800 "> AI 분석 결과 리포트</div>
      </div>
      <div className=" w-10 h-10">
        <Image src={blueStar} alt="blueStar" fit-content />
      </div>
      <div className="text-blue400 font-semibold">
        아직 AI 분석이 되지 않았어요 !
      </div>
    </div>
  );
}
