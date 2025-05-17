import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import axiosInstance from "@/lib/api/instance";
import useUserStore from "@/lib/store/useUserStore";

interface PhotoManagerProps {
  status: string;
  rentalId: number;
  uploadType: "before" | "after";
  onPhotoChange?: (files: File[]) => void;
  photos?: File[];
  serverImages?: string[];
}

export default function PhotoManager({
  status,
  rentalId,
  onPhotoChange,
  uploadType,
  photos = [],
  serverImages = [],
}: PhotoManagerProps) {
  const { userId } = useUserStore();

  if (!userId) return null;

  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [serverImageUrls, setServerImageUrls] =
    useState<string[]>(serverImages);
  const [isLoading, setIsLoading] = useState(true);

  // 서버 이미지 불러오기
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/api/v1/rentals/${rentalId}/ai-analysis`
        );
        const data = response.data;

        const images =
          uploadType === "before"
            ? data.beforeImages || []
            : data.afterImages || [];
        setServerImageUrls(images);
      } catch (error) {
        console.error("이미지 로드 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (serverImages.length === 0 && rentalId) {
      fetchImages();
    } else {
      setServerImageUrls(serverImages);
      setIsLoading(false);
    }
  }, [rentalId, uploadType, serverImages]);

  // 미리보기 URL 생성
  useEffect(() => {
    previews.forEach((url) => URL.revokeObjectURL(url));

    if (!photos || photos.length === 0) {
      setPreviews([]);
      return;
    }

    const newPreviews = photos.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photos]);

  // 파일 선택 핸들러
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const totalCount = photos.length + serverImageUrls.length;

    if (totalCount + filesArray.length > 10) {
      alert("최대 10장까지만 업로드할 수 있습니다.");
      return;
    }

    onPhotoChange?.([...photos, ...filesArray]);

    try {
      setUploading(true);
      await uploadPhotos(filesArray);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("사진 업로드 오류:", error);
      alert("사진 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  // 업로드 API 요청
  const uploadPhotos = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    const response = await axiosInstance.post(
      `/api/v1/rentals/${rentalId}/${uploadType}/photos`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  };

  const totalImages = serverImageUrls.length + photos.length;

  return (
    <div className="flex">
      <div className="items-center justify-center w-full">
        <div className="mt-2 mb-4 w-full flex flex-col">
          {/* FileUpload를 가운데로 감싸는 div에 flex justify-center 추가 */}
          <div className="flex justify-center">
            {totalImages < 10 ? (
              <FileUpload
                onChange={handleFileChange}
                multiple
                disabled={uploading}
              />
            ) : (
              <div className="text-sm text-red-500 mt-2">
                최대 업로드 수(10장)에 도달했습니다.
              </div>
            )}
          </div>

          {/* 상태 메시지 */}
          <div className="p-2 text-center">
            {status && (
              <div className="text-xl text-gray-900 font-semibold">
                {status}
              </div>
            )}
            <div className="text-sm text-gray-600">
              {`${totalImages}장 등록됨 (최대 10장)`}
            </div>
            {uploading && (
              <div className="mt-2 bg-blue-100 text-blue-700 p-2 rounded">
                사진 업로드 중...
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-2 bg-green-100 text-green-700 p-2 rounded">
                사진이 성공적으로 업로드되었습니다.
              </div>
            )}
          </div>

          {/* 이미지 미리보기 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 mt-4">
            {serverImageUrls.map((url, index) => (
              <img
                key={`server-${index}`}
                src={url}
                alt={`서버 이미지 ${index + 1}`}
                className="w-full h-auto rounded-md border"
              />
            ))}

            {previews.map((previewUrl, index) => (
              <img
                key={`preview-${index}`}
                src={previewUrl}
                alt={`업로드 미리보기 ${index + 1}`}
                className="w-full h-auto rounded-md border"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
