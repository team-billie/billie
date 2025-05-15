"use client";

import { Camera, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ProductRegisterImageUploadProps {
  value: File[];
  onChange: (images: File[]) => void;
}

export default function ProductRegisterImageUpload({
  value,
  onChange,
}: ProductRegisterImageUploadProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>(value);
  
  // 이미지 미리보기 URL 관리
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
 // 컴포넌트 마운트 시 또는 value prop이 변경될 때 상태 초기화
  useEffect(() => {
    if (value) {
      setSelectedImages(value);
    }
  }, [value]);
  

  // 이미지가 변경될 때마다 미리보기 URL 업데이트
  useEffect(() => {
    // 기존 URL 정리
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    // 새 미리보기 URL 생성
    const newUrls = selectedImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(newUrls);
    
    // 상위 컴포넌트에 변경사항 전달
    onChange(selectedImages);
    
    // 컴포넌트 언마운트 시 URL 정리
    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedImages, onChange]);
  
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
          
          {/* 카메라 아이콘 */}
          <Camera className="w-8 h-8 text-gray-400" aria-hidden="true" />
          
          {/* 이미지 카운터 */}
          <span className="text-gray-400 text-sm mt-2" aria-live="polite">
            {selectedImages.length}/10
          </span>
        </button>
        
        {/* 이미지 미리보기 영역 */}
        {previewUrls.map((url, index) => (
          <div key={index} className="relative w-24 h-24">
            {/* 이미지 미리보기 */}
            <img
              src={url}
              alt={`상품 이미지 ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md border border-gray-200"
            />
            
            {/* 삭제 버튼 */}
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-gray-700 bg-opacity-70 rounded-full w-6 h-6 flex items-center justify-center"
              aria-label={`이미지 ${index + 1} 삭제`}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}