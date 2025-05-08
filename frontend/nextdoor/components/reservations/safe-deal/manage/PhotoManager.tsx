import Image from "next/image";
import { useEffect, useState } from "react";
import ImagePreview from "./ImagePreview";
import FileUpload from "./FileUpload";
// 1. 이미지 도메인 next.config.mjs 에 설정 해야함.
// 2. Image 컴포넌트를 사용함. -> 가변적으로 하고 싶으면 껍데기를 relative, Image fill, objectFit cover or contain

interface PhotoManagerProps {
  status: string;
  onPhotoChange?: (files: File[]) => void;
  photos?: File[];
}

export default function PhotoManager({
  status,
  onPhotoChange,
  photos = [],
}: PhotoManagerProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  // 파일이 변경될 때마다 미리보기 URL 생성
  useEffect(() => {
    // 기존 URL 객체 정리
    previews.forEach((url) => URL.revokeObjectURL(url));

    if (!photos || photos.length === 0) {
      setPreviews([]);
      return;
    }

    // 새로운 미리보기 URL 생성
    const newPreviews = photos.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Clean up the URLs when component unmounts
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onPhotoChange?.([]);
      return;
    }

    // FileList를 배열로 변환
    const filesArray = Array.from(files);
    onPhotoChange?.(filesArray);
  };

  // 특정 이미지 삭제
  const handleDelete = (index: number) => {
    if (!photos || !onPhotoChange) return;

    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotoChange(newPhotos);
  };
  return (
    <div className="flex-1 w-full p-3">
      <div className="flex justify-between items-center">
        <div className="text-xl text-gray900">{status}</div>
        <div className="text-sm text-gray600">{photos.length}장 등록됨</div>
      </div>

      {/* 미리보기 영역 */}
      <div className="mt-2 mb-4">
        {previews.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {previews.map((preview, index) => (
              <ImagePreview
                key={preview}
                preview={preview}
                status={status}
                onDelete={() => handleDelete(index)}
                isMultiple
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-md border-2 border-dashed border-gray-300">
            <p className="text-gray-500">이미지를 업로드해주세요</p>
          </div>
        )}
      </div>

      {/* 파일 업로드 */}
      <FileUpload onChange={handleFileChange} multiple />
    </div>
  );
}
