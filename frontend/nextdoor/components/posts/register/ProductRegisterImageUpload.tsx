"use client";

import { Camera, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ProductCondition } from "./ProductConditionModal";
import useProductRegisterStore from "@/lib/store/posts/useProductRegisterStore";

interface ProductRegisterImageUploadProps {
  value: File[];
  onChange: (images: File[]) => void;
  isAiMode: boolean;
  isFromLocationPage: boolean;
  onAiAnalyzeResult: (result: { title: string; content: string; category: string; condition: ProductCondition }) => void;
}

export default function ProductRegisterImageUpload({
  value,
  onChange,
  isAiMode,
  isFromLocationPage,
  onAiAnalyzeResult,
}: ProductRegisterImageUploadProps) {
  console.log("[ProductRegisterImageUpload] 렌더", { isAiMode, isFromLocationPage, onAiAnalyzeResult });
  const [selectedImages, setSelectedImages] = useState<File[]>(value);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setCondition } = useProductRegisterStore();
  
  // 컴포넌트 마운트 시 또는 value prop이 변경될 때 상태 초기화
  useEffect(() => {
    if (value) {
      setSelectedImages(value);
    }
  }, [value]);

  // 이미지가 변경될 때마다 미리보기 URL 업데이트
  useEffect(() => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    const newUrls = selectedImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(newUrls);
    onChange(selectedImages);
    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedImages, onChange]);

  // 이미지 업로드 시 AI 분석 시작 (분석 중이 아닐 때만)
  useEffect(() => {
    console.log("[ProductRegisterImageUpload] useEffect 트리거", { isAiMode, selectedImages, isFromLocationPage, isAnalyzing });
    if (
      isAiMode &&
      selectedImages.length > 0 &&
      !isFromLocationPage &&
      !isAnalyzing
    ) {
      handleAiAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAiMode, selectedImages, isFromLocationPage]);

  const handleAiAnalysis = async () => {
    console.log("[ProductRegisterImageUpload] handleAiAnalysis 실행");
    setIsAnalyzing(true);
    try {
      // TODO: 실제 AI 분석 API 호출
      const conditions: ProductCondition[] = [
        "미개봉",
        "거의 새 제품",
        "양호",
        "보통",
        "사용감 있음",
        "수리 필요함"
      ];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      // 임시 더미 데이터
      setTimeout(() => {
        const result = {
          title: "삼성 노트북 갤럭시북3",
          content: `상태: ${randomCondition}\n거의 새 제품이며 상태 좋습니다. 단기 대여 가능합니다. 배터리 성능 좋고 충전기 함께 대여됩니다.`,
          category: "디지털기기",
          condition: randomCondition
        };
        console.log("[ProductRegisterImageUpload] 분석 결과 전달:", result);
        onAiAnalyzeResult(result);
        setIsAnalyzing(false);
      }, 1800);
    } catch (error) {
      setIsAnalyzing(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const currentCount = selectedImages.length;
      const remainingSlots = 10 - currentCount;
      if (remainingSlots <= 0) {
        alert('최대 10개의 이미지만 업로드 가능합니다.');
        return;
      }
      const filesArray = Array.from(e.target.files);
      const imageFiles = filesArray.filter(file => file.type.startsWith('image/'));
      const newFiles = imageFiles.slice(0, remainingSlots);
      setSelectedImages(prevImages => [...prevImages, ...newFiles]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prevImages => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };
  
  const handleCameraClick = () => {
    if (selectedImages.length >= 10) {
      alert('최대 10개의 이미지만 업로드 가능합니다.');
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="px-4 mt-4">
      <div className="flex flex-wrap gap-3">
        {/* 이미지 업로드 버튼 */}
        <button
          type="button"
          onClick={handleCameraClick}
          className="flex flex-col items-center justify-center w-24 h-24 bg-gray-100 rounded-md"
          aria-label="상품 이미지 업로드"
          disabled={isAnalyzing}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
            multiple 
            capture="environment" 
          />
          <Camera className="w-8 h-8 text-gray-400" aria-hidden="true" />
          <span className="text-gray-400 text-sm mt-2" aria-live="polite">
            {selectedImages.length}/10
          </span>
        </button>
        {previewUrls.map((url, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={url}
              alt={`상품 이미지 ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md border border-gray-200"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-gray-700 bg-opacity-70 rounded-full w-6 h-6 flex items-center justify-center"
              aria-label={`이미지 ${index + 1} 삭제`}
              disabled={isAnalyzing}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}