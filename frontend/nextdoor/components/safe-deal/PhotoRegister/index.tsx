"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import PhotoBox from "../CompareAnalysis/AllPhotos/PhotoBox";
import Title from "../Title";
import GrayButton from "../GrayButton";
import useAnalysisStore from "@/lib/store/useAiAnalysisStore";
import {
  AiAfterPhotosPostRequest,
  AiBeforePhotosPostRequest,
} from "@/lib/api/ai-analysis/request";
import useUserStore from "@/lib/store/useUserStore";

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
  const { id } = useParams();
  const router = useRouter();
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  const [serverData, setServerData] = useState<AiAnalysisData | null>(null);

  if (!userId) return null;

  const handleAnalysis = async () => {
    try {
      if (!id) return;
      const rentalId = Number(id);

      const res =
        status === "before"
          ? await AiBeforePhotosPostRequest(rentalId)
          : await AiAfterPhotosPostRequest(rentalId);

      if (status === "before") {
        console.log("res : ", res);
        useAnalysisStore
          .getState()
          .setDamageAnalysis(res.damageAnalysis || "[]");
        router.push(`/safe-deal/${rentalId}/before/analysis`);
      } else {
        router.push(`/safe-deal/${rentalId}/after/analysis`);
      }
    } catch (error) {
      alert("AI 분석 중 오류가 발생했습니다.");
    }
  };

  const photoKey = status === "before" ? "beforeImages" : "afterImages";

  return (
    <main>
      <div>
        <Title status={status} />
        <div className="h-screen flex flex-col items-center gap-4">
          <PhotoManager
            rentalId={Number(id)}
            status={status}
            uploadType={status}
            onPhotoChange={setRentalPhotos}
            photos={rentalPhotos}
            serverImages={serverData?.[photoKey] || []}
          />
          <div className="fixed bottom-4 left-0 w-full px-4">
            <div className="max-w-md mx-auto">
              <GrayButton txt="AI 물품 상태 확인" onClick={handleAnalysis} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
