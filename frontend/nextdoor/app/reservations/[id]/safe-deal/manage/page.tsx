"use client";

import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import SafeDealNavbar from "@/components/reservations/safe-deal/SafeDealNavbar";
import { fetchAiAnalysis } from "@/lib/api/ai-analysis/request";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SafeDealManage() {
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  const [returnPhotos, setReturnPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { id } = useParams();

  const handleAnalysis = async () => {
    if (rentalPhotos.length === 0 || returnPhotos.length === 0) {
      alert("대여 물품 사진과 반납 물품 사진을 모두 등록해주세요.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchAiAnalysis(Number(id));
      setResult(res);
      console.log("AI 분석 결과:", res);
    } catch (error) {
      alert("AI 분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <SafeDealNavbar />
      <div className="h-screen flex flex-col justify-center items-center">
        <PhotoManager status="대여 물품 사진" />
        <PhotoManager status="반납 물품 사진" />

        <div className="px-4 w-full">
          <button
            className="btn w-full h-14 bg-gradient-to-r from-blue200 to-blue400 text-white"
            onClick={handleAnalysis}
          >
            AI 분석 결과 확인
          </button>
        </div>
      </div>
    </main>
  );
}
