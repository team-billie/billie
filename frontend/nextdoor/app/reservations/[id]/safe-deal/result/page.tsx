"use client";
// import PhotoNotFound from "@/components/reservations/safe-deal/PhotoNotFound";
import PhotoNotFound from "@/components/reservations/safe-deal/result/PhotoNotFound";
import ResultSummary from "@/components/reservations/safe-deal/result/ResultSummary";
import SafeDealNavbar from "@/components/reservations/safe-deal/SafeDealNavbar";
import axiosInstance from "@/lib/api/instance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SafeDealResult() {
  const [isResult, setIsResult] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPhotos, setHasPhotos] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const checkPhotos = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        // API에서 데이터 가져오기
        const response = await axiosInstance.get(
          `/api/v1/rentals/${id}/ai-analysis`
        );
        const data = response.data;

        // 사진이 있는지 확인 (대여 전/후 사진이 각각 하나 이상 있어야 함)
        const hasBefore = data.beforeImages && data.beforeImages.length > 0;
        const hasAfter = data.afterImages && data.afterImages.length > 0;

        setHasPhotos(hasBefore && hasAfter);
      } catch (error) {
        console.error("Error checking photos:", error);
        setHasPhotos(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPhotos();
  }, [id]);
  return (
    <main>
      <SafeDealNavbar />
      <div className="h-screen flex flex-col p-4">
        <div className="pb-4">
          <div className="text-xl text-gray900">
            우리의 물품이 얼마나 일치할까?
          </div>
          <div className="text-sm text-gray700">
            AI를 통해 대여 전/후 물품의 일치율을 체크해 보세요.
          </div>
        </div>

        <div className="flex-1">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">로딩 중...</p>
            </div>
          ) : hasPhotos ? (
            <ResultSummary />
          ) : (
            <PhotoNotFound />
          )}
        </div>
      </div>
    </main>
  );
}
