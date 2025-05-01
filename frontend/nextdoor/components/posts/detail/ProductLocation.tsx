"use client";

import { User } from "lucide-react";

export default function ProductLocation() {
  return (
    <div className="my-4">
      <div className="flex gap-2 my-2 ">
        <User className="bg-blue-100 text-blue400 rounded-full p-1.5 w-8 h-8" />
        <div className="text-2xl text-blue400">Location</div>
      </div>
      <div className="bg-gray400 h-52 m-4 rounded-2xl"></div>
      <div className="mx-4 -mt-2 text-gray800">부산광역시 녹산산단 355로</div>
      <div className="h-0.5 w-full bg-gray200 my-2"></div>
    </div>
  );
}
