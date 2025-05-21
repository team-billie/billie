import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import axiosInstance from "@/lib/api/instance";
import useUserStore from "@/lib/store/useUserStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useAlertStore } from "@/lib/store/useAlertStore";

interface PhotoManagerProps {
  status: string;
  rentalId: number;
  uploadType: "before" | "after";
  onPhotoChange?: (files: File[]) => void;
  onServerImagesLoaded?: (urls: string[]) => void;
  photos?: File[];
  serverImages?: string[];
}

export default function PhotoManager({
  status,
  rentalId,
  onPhotoChange,
  onServerImagesLoaded,
  uploadType,
  photos = [],
  serverImages = [],
}: PhotoManagerProps) {
  const { userId } = useUserStore();
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [serverImageUrls, setServerImageUrls] = useState<string[]>(serverImages);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { showAlert } = useAlertStore();

  // 서버 이미지 불러오기
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

      // 서버 이미지 로드가 완료되면 상위 컴포넌트에 알림
      if (onServerImagesLoaded && images.length > 0) {
        onServerImagesLoaded(images);
      }
    } catch (error) {
      console.error("이미지 로드 오류:", error);
      showAlert("이미지를 불러오는데 실패했습니다.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // serverImages prop이 변경될 때마다 serverImageUrls 상태 업데이트
  useEffect(() => {
    setServerImageUrls(serverImages);
    setIsLoading(false);
  }, [serverImages]);

  // 초기 데이터 로드
  useEffect(() => {
    if (!userId || !rentalId) return;
    
    if (serverImages.length === 0) {
      fetchImages();
    }
  }, [rentalId, uploadType, userId]);

  // 미리보기 URL 생성
  useEffect(() => {
    // 기존 URL 해제
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

  if (!userId) return null;

  // 파일 선택 핸들러
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    // 실제 총 이미지 수는 서버에 있는 이미지와 현재 대기 중인 이미지(photos)의 합
    const totalCount = serverImageUrls.length + photos.length;

    if (totalCount + filesArray.length > 10) {
      showAlert("최대 10장까지만 업로드할 수 있습니다.", "error");
      return;
    }

    try {
      setUploading(true);

      // 상위 컴포넌트에 파일 전달 (상태 관리용)
      onPhotoChange?.(filesArray);

      // 서버에 업로드
      const result = await uploadPhotos(filesArray);

      setUploadSuccess(true);
      // 업로드 성공 후 서버 이미지 목록 새로고침
      await fetchImages();

      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("사진 업로드 오류:", error);
      showAlert("사진 업로드에 실패했습니다.", "error");
    } finally {
      setUploading(false);
      e.target.value = "";
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

  // 실제 총 이미지 수는 서버에 있는 이미지와 대기 중인 로컬 이미지의 합
  const totalImages = serverImageUrls.length + photos.length;

  return (
    <div className="flex justify-center items-center overflow-hidden w-full flex-1">
      <div className="w-full max-w-screen-sm px-4">
        <div className="w-full flex flex-col">
          <div className="flex justify-center">
            {totalImages < 10 ? (
              <FileUpload
                onChange={handleFileChange}
                multiple
                disabled={uploading}
              />
            ) : (
              <ErrorMessage message="최대 업로드 수(10장)에 도달했습니다." />
            )}
          </div>

          <div className="p-2 text-center">
            <div className="text-sm text-gray-600">
              {`${totalImages}장 등록됨 (최대 10장)`}
            </div>
          </div>

          <div className="w-full relative mt-4 mb-4">
            {isLoading ? (
              <div className="text-center py-4">이미지를 불러오는 중...</div>
            ) : serverImageUrls.length === 0 && previews.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                등록된 이미지가 없습니다.
              </div>
            ) : (
              <Swiper
                slidesPerView={2.4}
                spaceBetween={8}
                freeMode={true}
                pagination={{ clickable: true }}
                modules={[FreeMode]}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                className="w-full"
                style={{ padding: "10px 0" }}
              >
                {serverImageUrls.map((image, idx) => (
                  <SwiperSlide key={`server-${idx}`}>
                    <div
                      className="relative w-full h-44 cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={image}
                        alt={`Product ${idx + 1}`}
                        fill
                        className="object-cover"
                        onError={() => {
                          showAlert("이미지를 불러올 수 없습니다.", "error");
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {previews.map((previewUrl, idx) => (
                  <SwiperSlide key={`local-${idx}`}>
                    <div
                      className="relative w-full h-44 cursor-pointer"
                      onClick={() => setSelectedImage(previewUrl)}
                    >
                      <Image
                        src={previewUrl}
                        alt={`New upload ${idx + 1}`}
                        fill
                        className="object-cover"
                        onError={() => {
                          showAlert("이미지를 불러올 수 없습니다.", "error");
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
