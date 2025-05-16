"use client";
import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import PhotoNotFound from "@/components/reservations/safe-deal/result/PhotoNotFound";
import ResultSummary from "@/components/reservations/safe-deal/result/ResultSummary";
import useUserStore from "@/lib/store/useUserStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../Button";
import Title from "../Title";
import {
  AiAfterPhotosRequest,
  AiBeforePhotosRequest,
} from "@/lib/api/ai-analysis/request";

interface PhotoRegisterProps {
  status: "after" | "before";
}

interface AiAnalysisData {
  beforeImages: string[];
  afterImages: string[];
  analysis: any | null;
}

export default function PhotoRegister({ status }: PhotoRegisterProps) {
  const { userId } = useUserStore();
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  //상태 값 바꿔주기
  const [serverData, setServerData] = useState<AiAnalysisData | null>(null);
  const [isResult, setIsResult] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const handleBeforePhotos = async () => {
    if (!userId) return;
    try {
      const res = await AiBeforePhotosRequest(Number(id));
      router.push(`/safe-deal/${id}/before/payment`);
      setIsResult(true);
    } catch (error) {
      alert("AI 분석 중 오류가 발생했습니다.");
    }
  };

  if (!userId) {
    return null;
  }
  const handleAfterPhotos = async () => {
    if (!userId) return;
    try {
      const res = await AiAfterPhotosRequest(Number(id));
      router.push(`/safe-deal/${id}/after/analysis`);
    } catch (error) {
      alert("AI 분석 중 오류가 발생했습니다.");
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <main>
      {status === "before" ? (
        <div>
          <Title status="before" />
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
              <Button
                txt="AI 물품 상태 확인"
                onClick={() => handleBeforePhotos()}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Title status="after" />
          <div className="h-screen flex flex-col items-center gap-4 ">
            <PhotoManager
              rentalId={Number(id)}
              status="반납일 물품 사진"
              uploadType="after"
              onPhotoChange={setRentalPhotos}
              photos={rentalPhotos}
              serverImages={serverData?.beforeImages || []}
            />
            <div className="flex-1 w-full px-4">
              {isResult ? <ResultSummary /> : <PhotoNotFound />}
            </div>

            <div className="px-4 w-full">
              <Button
                txt="AI 물품 상태 확인"
                onClick={() => handleAfterPhotos()}
              />
            </div>
          </div>
        </div>
      )}

      {/* <div className="absolute bottom-5 p-5 mt-2 text-gray600 ">
        해당 사진은 대여 전후 물품 상태를 비교하는데 활용되므로, 신중하게 촬영해
        주시기 바랍니다
      </div> */}
    </main>
  );
}
