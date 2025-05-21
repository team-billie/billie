"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import Title from "../Title";
import GrayButton from "../GrayButton";
import {
  AiAfterPhotosPostRequest,
  AiBeforePhotosPostRequest,
} from "@/lib/api/ai-analysis/request";
import useUserStore from "@/lib/store/useUserStore";
import { useAlertStore } from "@/lib/store/useAlertStore";
import axiosInstance from "@/lib/api/instance";

interface PhotoRegisterProps {
  status: "after" | "before";
}

interface ServerData {
  beforeImages?: string[];
  afterImages?: string[];
  analysis?: string;
}

export default function PhotoRegister({ status }: PhotoRegisterProps) {
  const { userId } = useUserStore();
  const { id } = useParams();
  const router = useRouter();
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const { showAlert } = useAlertStore();

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

  // 사진 변경 시 로컬 상태만 업데이트 (상태 관리 및 UI 표시용)
  const handlePhotoChange = (files: File[]) => {
    setRentalPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  // 서버 이미지가 로드되면 로컬 photos 배열을 비워서 중복 계산 방지
  // 서버 이미지가 있을 때만 호출되도록 수정
  const handleServerImagesLoaded = (serverImages: string[]) => {
    // 서버 이미지가 실제로 있을 때만 photos 배열을 비움
    if (serverImages && serverImages.length > 0) {
      setRentalPhotos([]);
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
            onPhotoChange={handlePhotoChange}
            onServerImagesLoaded={handleServerImagesLoaded}
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
