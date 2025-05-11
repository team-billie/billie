"use client";
import ProductInfos from "@/components/posts/detail/ProductInfos";
import ProductPhotos from "@/components/posts/detail/ProductPhotos";
import ProductReservation from "@/components/posts/detail/ProductReservation";
import { MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetailPage() {
  const [product, setProduct] = useState(null);
  useEffect(() => {}, []);
  const { id } = useParams();

  const feedId = Number(id);
  return (
    <main className="relative">
      <div className="min-h-screen flex flex-col pb-24">
        {/* 물품 사진 */}
        <ProductPhotos />
        {/* 상세정보 */}
        <ProductInfos />
      </div>

      {/* 고정 하단 영역 */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto z-50">
        {/* 채팅버튼 */}
        <div className="flex justify-end">
          <MessageCircle className="bg-gradient-to-r from-blue300 to-blue400 text-white rounded-full p-2 w-10 h-10 m-2 " />
        </div>
        {/* 예약 버튼 */}
        <div className=" bg-white p-2 border-t shadow-md">
          <ProductReservation feedId={feedId} />
        </div>
      </div>
    </main>
  );
}
