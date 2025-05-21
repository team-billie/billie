"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PhotoManager from "@/components/reservations/safe-deal/manage/PhotoManager";
import Title from "../Title";
import GrayButton from "../GrayButton";
import {
  AiAfterPhotosPostRequest,
  AiBeforePhotosPostRequest,
  PhotosUploadRequest,
  AiAnalysisGetRequest,
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
  const { id } = useParams();
  const router = useRouter();
  const [rentalPhotos, setRentalPhotos] = useState<File[]>([]);
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const { showAlert } = useAlertStore();
  const [hasPhotos, setHasPhotos] = useState(false);
  
  // 서버 데이터 가져오기
  const fetchServerData = async () => {
    try {
      if (!id) return;
      const data = await AiAnalysisGetRequest(Number(id));
      setServerData(data);
      const photoKey = status === "before" ? "beforeImages" : "afterImages";
      if (data[photoKey]?.length > 0) {
        setHasPhotos(true);
      }
    } catch (error) {
      console.error("서버 데이터 로드 실패:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchServerData();
  }, [id, status]);

  // 이미지 압축 함수
  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // 이미지 크기가 1200px를 초과하면 비율에 맞게 축소
          const MAX_SIZE = 1200;
          if (width > height && width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // 압축된 이미지를 Blob으로 변환
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error('이미지 압축 실패'));
              }
            },
            'image/jpeg',
            0.7 // 품질 70%
          );
        };
        img.onerror = () => reject(new Error('이미지 로드 실패'));
      };
      reader.onerror = () => reject(new Error('파일 읽기 실패'));
    });
  };

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

  const handleUpload = async () => {
    try {
      if (rentalPhotos.length === 0) {
        showAlert("업로드할 사진을 선택해주세요.", "error");
        return;
      }

      // 파일 크기 체크 (각 파일 5MB 제한)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = rentalPhotos.filter(file => file.size > MAX_FILE_SIZE);
      
      if (oversizedFiles.length > 0) {
        showAlert("파일 크기는 5MB를 초과할 수 없습니다.", "error");
        return;
      }

      const res = await PhotosUploadRequest(Number(id), status, rentalPhotos);
      if (res) {
        setHasPhotos(true);
        // setRentalPhotos([]); // 로컬 사진 유지
        showAlert("사진 업로드 성공", "success");
        // 업로드 후 서버 데이터 새로고침
        await fetchServerData();
      } else {
        showAlert("사진 업로드 실패", "error");
      }
    } catch (error: any) {
      console.error("사진 업로드 중 오류 발생:", error);
      if (error.response?.status === 413) {
        showAlert("파일 크기가 너무 큽니다. 각 파일은 5MB 이하여야 합니다.", "error");
      } else {
        showAlert("사진 업로드 중 오류가 발생했습니다.", "error");
      }
    }
  }

  // 사진 변경 시 로컬 상태 업데이트
  const handlePhotoChange = async (files: File[]) => {
    try {
      const compressedFiles = await Promise.all(
        files.map(file => compressImage(file))
      );
      setRentalPhotos((prevPhotos) => [...prevPhotos, ...compressedFiles]);
    } catch (error) {
      console.error('이미지 압축 중 오류:', error);
      showAlert('이미지 압축 중 오류가 발생했습니다.', 'error');
    }
  };

  // 서버 이미지가 로드되면 상태 업데이트
  const handleServerImagesLoaded = (serverImages: string[]) => {
    if (serverImages && serverImages.length > 0) {
      setHasPhotos(true);
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
        {hasPhotos? <div className="max-w-md mx-auto flex gap-4">
          <GrayButton txt="사진 추가 업로드" onClick={()=>{setHasPhotos(false)}} />
          <GrayButton txt="AI 물품 상태 확인" onClick={handleAnalysis} />
        </div>:
        <div className="max-w-md mx-auto">
          <GrayButton txt="물품 사진 업로드" onClick={handleUpload} />
        </div>}
        
      </div>
    </div>
  );
}
