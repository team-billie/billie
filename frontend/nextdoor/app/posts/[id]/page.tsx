"use client";
import ChatButton from "@/components/common/ChatButton/ChatButton";
import LoadingSpinner from "@/components/common/LoadingSpinner.tsx";
import ProductInfos from "@/components/posts/detail/ProductInfos";
import ProductPhotos from "@/components/posts/detail/ProductPhotos";
import ProductReservation from "@/components/posts/detail/ProductReservation";
import { GetPostLikeRequest } from "@/lib/api/posts";
import { postDetailRequest } from "@/lib/api/posts/request";
import { PostDetailResponseDTO } from "@/types/posts/response";
import { ChevronLeft, Heart, MessageCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostLikeDeleteRequest, PostLikeRequest } from "@/lib/api/posts";

export default function PostDetailPage() {
  const [product, setProduct] = useState<PostDetailResponseDTO | null>(null);
  const { id } = useParams();
  const feedId = Number(id);
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeBtn = () => {
    if (isLiked) {
      PostLikeDeleteRequest(id.toString());
    } else {
      PostLikeRequest(id.toString());
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    async function fetchPostDetail() {
      if (feedId) {
        const data = await postDetailRequest(feedId);
        setProduct(data);
        console.log(data);
      }
    }
    fetchPostDetail();

    async function fetchPostLike() {
      const data = await GetPostLikeRequest(feedId.toString());
      console.log(data);
      setIsLiked(data.liked);
    }
    fetchPostLike();

  }, [feedId]);

  if (!product) {
    return <LoadingSpinner />;
  }

   // authorId가 null인 경우 대비 (옵셔널 체이닝 사용)
   const authorId = product.authorId ?? 0;

  return (
    <main className="relative">
      <div className="min-h-screen flex flex-col pb-24">
        {/* 물품 페이지 헤더 */}
        <div className="absolute top-4 left-2 right-2 flex justify-between z-10 px-2">
          <div onClick={() => router.back()} className="flex items-center justify-center bg-blue100 bg-opacity-70 rounded-full text-gray800 w-11 h-11 p-1.5">
            <ChevronLeft className="w-6 h-6" />
          </div>
          <button className="flex items-center justify-center bg-blue100 bg-opacity-70 rounded-full text-gray-700 w-11 h-11 p-1.5">
            <Heart 
              className={`cursor-pointer transition-colors w-6 h-6 ${isLiked ? "text-pink-500 fill-pink-300" : "text-gray800 fill-gray400"}`}
              onClick={(e) => {
                e.preventDefault();
                handleLikeBtn();
              }}
            />
          </button>
        </div>

        {/* 물품 사진 */}
        <ProductPhotos images={product.productImage} />

        {/* 상세정보 */}
        <ProductInfos
          title={product.title}
          content={product.content}
          rentalFee={product.rentalFee}
          deposit={product.deposit}
          address={product.address}
          category={product.category}
          nickname={product.nickname}
        />
      </div>

      {/* 고정 하단 영역 */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto z-50">
        {/* 채팅버튼 */}
        <div className="flex justify-end">
          <ChatButton ownerId={authorId} postId={feedId} className="m-2" />
        </div>

        {/* 예약 버튼 */}
        <div className="bg-white p-2 border-t shadow-md">
          <ProductReservation
            feedId={feedId}
            rentalFee={product.rentalFee}
            deposit={product.deposit}
          />
        </div>
      </div>
    </main>
  );
}
