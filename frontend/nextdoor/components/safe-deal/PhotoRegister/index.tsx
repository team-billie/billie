"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import Title from "../Title";
import GrayButton from "../GrayButton";
import useAnalysisStore from "@/lib/store/useAiAnalysisStore";
import { AiBeforePhotosPostRequest } from "@/lib/api/ai-analysis/request";
import useUserStore from "@/lib/store/useUserStore";

interface PhotoRegisterProps {
  status: "after" | "before";
}

export default function PhotoRegister({ status }: PhotoRegisterProps) {
  const { userId } = useUserStore();
  const { id } = useParams();
  const router = useRouter();
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  const [serverData, setServerData] = useState<| null>(null);

  if (!userId) return null;

  const handleAnalysis = async () => {
    try {
      if (!id) return;
      const rentalId = Number(id);

      if (status === "before") {

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
    <main className="min-h-[calc(100dvh-4rem)]">
      <div>
        <Title status={status} />
        <div className="w-full p-4 flex flex-col items-center gap-4">
          <PhotoManager
            rentalId={Number(id)}
            status={status}
            uploadType={status}
            onPhotoChange={setRentalPhotos}
            photos={rentalPhotos}
            serverImages={serverData?.[photoKey] || []}
          />
          <div className="w-full">
            <div className="max-w-md mx-auto">
              <GrayButton txt="AI 물품 상태 확인" onClick={handleAnalysis} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
