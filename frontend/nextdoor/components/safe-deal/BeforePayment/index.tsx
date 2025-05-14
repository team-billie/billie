"use client";
import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import PhotoNotFound from "@/components/reservations/safe-deal/result/PhotoNotFound";
import ResultSummary from "@/components/reservations/safe-deal/result/ResultSummary";
import { fetchAiAnalysis } from "@/lib/api/ai-analysis/request";
import axiosInstance from "@/lib/api/instance";
import useUserStore from "@/lib/store/useUserStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AiAnalysisData {
  beforeImages: string[];
  afterImages: string[];
  analysis: any | null;
}

export default function BeforePayment() {
  const { userId } = useUserStore();
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  const [returnPhotos, setReturnPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [serverData, setServerData] = useState<AiAnalysisData | null>(null);
  const [isResult, setIsResult] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  // 컴포넌트 마운트 시 서버에서 데이터 가져오기
  useEffect(() => {
    if (!userId || !id) return;

    //
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/ai/analyze`);
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

    if (!hasBeforeImages) {
      alert("대여 물품 사진을 등록해주세요.");
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

  if (!userId) {
    return null;
  }

  return (
    <main>
      <div className="p-5 mt-2">
        <div className="font-bold text-xl  text-gray900">
          나의 대여 물품의 상태는 어떨까?
        </div>
        <div className="text-gray600 mt-2">
          <div>AI를 통해 대여전 물품의 상태를 체크해 보세요</div>
          <div>
            해당 사진은 대여 전후 물품 상태를 비교하는데 활용되므로, 신중하게
            촬영해 주시기 바랍니다
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col items-center gap-4 ">
        <PhotoManager
          rentalId={Number(id)}
          status="대여일 물품 사진"
          uploadType="before"
          onPhotoChange={setRentalPhotos}
          photos={rentalPhotos}
          serverImages={serverData?.beforeImages || []}
        />
        <div className="flex-1 w-full px-4">
          {isResult ? <ResultSummary /> : <PhotoNotFound />}
        </div>
        <div className="px-4 w-full">
          <button
            className="btn w-full h-14 bg-gradient-to-r from-blue200 to-blue400 text-white"
            onClick={handleAnalysis}
          >
            AI 물품 상태 확인
          </button>
        </div>
      </div>
    </main>
  );
}
