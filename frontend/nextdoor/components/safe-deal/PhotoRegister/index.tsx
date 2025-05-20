"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import Title from "../Title";
import GrayButton from "../GrayButton";
import useAnalysisStore from "@/lib/store/useAiAnalysisStore";
import {
  AiAfterPhotosPostRequest,
  AiBeforePhotosPostRequest,
} from "@/lib/api/ai-analysis/request";
import useUserStore from "@/lib/store/useUserStore";
import { useAlertStore } from "@/lib/store/useAlertStore";

interface PhotoRegisterProps {
  status: "after" | "before";
}

export default function PhotoRegister({ status }: PhotoRegisterProps) {
  const { userId } = useUserStore();
  const { id } = useParams();
  const router = useRouter();
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  const [serverData, setServerData] = useState<null>(null);
  const { showAlert } = useAlertStore();
  if (!userId) return null;

  const handleAnalysis = async () => {
    try {
      if (!id) return;
      const rentalId = Number(id);

      if (status === "before") {
        router.push(`/safe-deal/${rentalId}/before/analysis`);
      } else {
        AiAfterPhotosPostRequest(Number(id));
        router.push(`/safe-deal/${rentalId}/after/analysis`);
      }
    } catch (error) {
      showAlert("AI 분석 중 오류가 발생했습니다.", "error");
    }
  };

  const photoKey = status === "before" ? "beforeImages" : "afterImages";

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex flex-col">
        <Title status={status} />
        <div className="w-full flex-grow flex flex-col justify-center">
          <PhotoManager
            rentalId={Number(id)}
            status={status}
            uploadType={status}
            onPhotoChange={setRentalPhotos}
            photos={rentalPhotos}
            serverImages={serverData?.[photoKey] || []}
          />
        </div>
      </div>
      <div className="w-full p-4 mt-auto">
        <div className="max-w-md mx-auto">
          <GrayButton txt="AI 물품 상태 확인" onClick={handleAnalysis} />
        </div>
      </div>
    </div>
  );
}
