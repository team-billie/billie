"use client";

import { TriangleAlert } from "lucide-react";

interface ProductDescriptionProps {
  content: string;
}

export default function ProductDescription({
  content,
}: ProductDescriptionProps) {
  return (
    <div 
      className="my-4 bg-white rounded-tr-3xl p-4 shadow-sm "
      style={{ fontFamily: "'Hakgyoansim', sans-serif" }}
    >
      <div className="flex gap-2 mb-3 mx-4 my-4" >
        <TriangleAlert className="bg-blue-100 text-blue400 rounded-full p-1.5 w-8 h-8" />
        <div 
          className="text-2xl text-[#66A3FF]"
          style={{ fontFamily: "'Hakgyoansim', sans-serif", fontWeight: 700 }}
        >
          Description
        </div>
      </div>
      <div className="text-gray800 mx-4 my-4">{content}</div>
      <div className="h-0.5 w-full bg-gray200 my-2"></div>
    </div>
  );
}