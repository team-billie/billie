"use client";

import { TriangleAlert } from "lucide-react";

interface ProductDescriptionProps {
  content: string;
}

export default function ProductDescription({
  content,
}: ProductDescriptionProps) {
  return (
    <div className="my-4">
      <div className="flex gap-2 my-2 ">
        <TriangleAlert className="bg-blue-100 text-blue400 rounded-full p-1.5 w-8 h-8" />
        <div className="text-2xl text-blue400">Description</div>
      </div>
      <div className="text-gray800">{content}</div>
      <div className="h-0.5 w-full bg-gray200 my-2"></div>
    </div>
  );
}
