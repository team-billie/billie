"use client";
import ChatButton from "@/components/common/ChatButton/ChatButton";
import LoadingSpinner from "@/components/common/LoadingSpinner.tsx";
import ProductInfos from "@/components/posts/detail/ProductInfos";
import ProductPhotos from "@/components/posts/detail/ProductPhotos";
import ProductReservation from "@/components/posts/detail/ProductReservation";
import { GetPostLikeRequest } from "@/lib/api/posts";
import { postDetailRequest } from "@/lib/api/posts/request";
import { PostDetailResponse } from "@/types/posts/response";
import { ChevronLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostLikeDeleteRequest, PostLikeRequest } from "@/lib/api/posts";
// CSS 파일 import (아래 2번 방법에서 생성할 CSS)
import '@/styles/fonts.css';
import { PostDetailResponseDTO } from "@/types/posts/response/index";

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
    <main className="relative hakgyoansim-font" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="min-h-screen flex flex-col pb-24">
         {/* 물품 페이지 헤더 */}
         <div className="absolute top-0 left-0 right-0 flex items-center justify-between z-10 h-24 px-4 bg-gradient-to-r from-[#596DCA] to-[#66A3FF]">
          <div onClick={() => router.back()} className="flex items-center justify-center bg-white bg-opacity-70 rounded-full text-gray800 w-10 h-10">
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div className="text-white text-base font-medium flex items-center">옆집물건 살펴보기</div>
          <div className="flex items-center space-x-2">
            <button >
              <Heart 
                className={`cursor-pointer transition-colors w-6 h-6 ${isLiked ? "text-pink-500 fill-pink-300" : "text-gray800 fill-gray400"}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLikeBtn();
                }}
              />
            </button>
          </div>
        </div>

        {/* 물품 사진 */}
        <div className="pt-24 "> {/* 헤더 높이만큼 패딩 추가 */}
          <ProductPhotos images={product.productImage} />
        </div>

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

      {/* 새로운 하단바 디자인 (기능은 원래대로 유지) */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto z-50">
        <div className="bg-white p-3 shadow-md flex items-center rounded-t-xl">
          {/* 채팅 버튼 - 원래 ChatButton 컴포넌트 사용 */}
          <div className="flex-shrink-0 mr-3">
            <ChatButton 
              ownerId={authorId} 
              postId={feedId} 
              className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center"
            />
          </div>
          
          {/* 예약하기 버튼 - ProductReservation 컴포넌트 감싸기 */}
              {/* 수정된 예약하기 버튼 - 중첩 컨테이너 제거 */}
          <ProductReservation
            feedId={feedId}
            rentalFee={product.rentalFee}
            deposit={product.deposit}
            customButtonClass="flex-grow bg-gradient-to-r from-[#C8E1FF] to-[#66A3FF] text-white rounded-full h-16 flex items-center justify-center text-lg oagothic-medium"
            buttonText="예약하기"
            hidePrice={true}
          />
        </div>
      </div>
    </main>
  );
}
