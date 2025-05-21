"use client";

import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import SafeDealNavbar from "@/components/reservations/safe-deal/SafeDealNavbar";
import Title from "@/components/safe-deal/Title";
import { AiBeforePhotosPostRequest } from "@/lib/api/ai-analysis/request";
import axiosInstance from "@/lib/api/instance";
import { useAlertStore } from "@/lib/store/useAlertStore";
import useUserStore from "@/lib/store/useUserStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AiAnalysisData {
  beforeImages: string[];
  afterImages: string[];
  analysis: any | null;
}

export default function SafeDealManage() {
  const { userId } = useUserStore();
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  const [returnPhotos, setReturnPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [serverData, setServerData] = useState<AiAnalysisData | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const { showAlert } = useAlertStore();
  // 컴포넌트 마운트 시 서버에서 데이터 가져오기
  useEffect(() => {
    if (!userId || !id) return;

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/rentals/${id}/ai-analysis`
        );
        setServerData(response.data);
        console.log(response.data);
        // 분석 결과가 있으면 설정
        if (response.data.analysis) {
          setResult(response.data.analysis);
        }
      } catch (error) {
        console.error("데이터 로드 오류:", error);
      }
    };

    fetchData();
  }, [id, userId]);

  const handleAnalysis = async () => {
    if (!userId) return;

    const hasBeforeImages =
      rentalPhotos.length > 0 || (serverData?.beforeImages?.length || 0) > 0;
    const hasAfterImages =
      returnPhotos.length > 0 || (serverData?.afterImages?.length || 0) > 0;

    if (!hasBeforeImages || !hasAfterImages) {
      showAlert(
        "대여 물품 사진과 반납 물품 사진을 모두 등록해주세요.",
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      const res = await AiBeforePhotosPostRequest(Number(id));
      setResult(res);
      console.log("AI 분석 결과:", res);
    } catch (error) {
      showAlert("AI 분석 중 오류가 발생했습니다.", "error");
    } finally {
      setLoading(false);
      router.push(`/reservations/${id}/safe-deal/result`);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <main>
      <SafeDealNavbar />
      <div className="h-screen flex flex-col items-center gap-4 py-6">
        <div className="font-bold text-xl text-white">
          나의 물품의 상태는 어떨까?
        </div>
        <PhotoManager
          rentalId={Number(id)}
          status="대여 물품 사진"
          uploadType="before"
          onPhotoChange={setRentalPhotos}
          photos={rentalPhotos}
          serverImages={serverData?.beforeImages || []}
        />
        <div></div>
        <PhotoManager
          rentalId={Number(id)}
          status="반납 물품 사진"
          uploadType="after"
          onPhotoChange={setReturnPhotos}
          photos={returnPhotos}
          serverImages={serverData?.afterImages || []}
        />

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
