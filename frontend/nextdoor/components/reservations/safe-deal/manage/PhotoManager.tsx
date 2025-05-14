import { useEffect, useState } from "react";
import ImagePreview from "./ImagePreview";
import FileUpload from "./FileUpload";
import axiosInstance from "@/lib/api/instance";
import useUserStore from "@/lib/store/useUserStore";
// 1. 이미지 도메인 next.config.mjs 에 설정 해야함.
// 2. Image 컴포넌트를 사용함. -> 가변적으로 하고 싶으면 껍데기를 relative, Image fill, objectFit cover or contain

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
  console.log("PhotoManager userId:", userId);

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [serverImageUrls, setServerImageUrls] =
    useState<string[]>(serverImages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/api/v1/rentals/${rentalId}/ai-analysis`
        );
        const data = response.data;

        // 업로드 타입에 따라 이미지 배열 선택
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

    // 서버 이미지가 제공되지 않은 경우에만 API 호출
    if (serverImages.length === 0 && rentalId) {
      fetchImages();
    } else {
      setServerImageUrls(serverImages);
      setIsLoading(false);
    }
  }, [rentalId, uploadType, serverImages]);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    // FileList를 배열로 변환
    const filesArray = Array.from(files);

    // 사진 업로드 상태 관리
    if (filesArray.length > 0) {
      // 상태 업데이트 (UI 반영 위해)
      onPhotoChange?.([...photos, ...filesArray]);

      // API 요청 보내기
      try {
        setUploading(true);
        await uploadPhotos(filesArray);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000); // 성공 메시지 3초 후 사라짐
      } catch (error) {
        console.error("사진 업로드 오류:", error);
        alert("사진 업로드에 실패했습니다.");
      } finally {
        setUploading(false);
      }
    }
  };

  // 사진 업로드 API 호출 함수 (axios 사용)
  const uploadPhotos = async (files: File[]) => {
    const formData = new FormData();

    // 여러 파일 추가
    files.forEach((file) => {
      formData.append("file", file);
    });

    // axios를 사용하여 POST 요청 보내기
    const response = await axiosInstance.post(
      `/api/v1/rentals/${rentalId}/${uploadType}/photos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  };

  // 특정 이미지 삭제
  const handleDelete = (index: number) => {
    if (!photos || !onPhotoChange) return;

    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotoChange(newPhotos);
  };

  const totalImages = serverImageUrls.length + photos.length;

  return (
    <div className="w-full p-5">
      <div className="flex justify-between flex-col">
        <div className="text-xl text-gray900 font-semibold">{status}</div>
        <div className="text-sm text-gray600">
          {" "}
          {isLoading ? "로딩 중..." : `${totalImages}장 등록됨 (최대 10장)`}
        </div>
      </div>
      {/* 업로드 상태 표시 */}
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
      {/* 미리보기 영역 */}
      <div className="mt-2 mb-4">
        {isLoading ? (
          <div className="w-full flex justify-center items-center pt-3">
            <div className="w-1/2 h-40 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">로딩 중...</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-2">
              {/* 서버 이미지 표시 */}
              {serverImageUrls.map((imageUrl, index) => (
                <ImagePreview
                  key={`server-${index}-${imageUrl}`}
                  preview={imageUrl}
                  status={status}
                  isMultiple
                  isServerImage
                />
              ))}

              {/* 로컬 이미지 표시 */}
              {previews.map((preview, index) => (
                <ImagePreview
                  key={`local-${index}-${preview}`}
                  preview={preview}
                  status={status}
                  onDelete={() => handleDelete(index)}
                  isMultiple
                />
              ))}

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
              {/* <div className="h-32 flex items-center justify-center bg-gray-100 rounded-md border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-3xl">+</p>
              </div> */}
            </div>
          </div>
        )}
      </div>

      {/* 파일 업로드 (10장 제한) */}
    </div>
  );
}
