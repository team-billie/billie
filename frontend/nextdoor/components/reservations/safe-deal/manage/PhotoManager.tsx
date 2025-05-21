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
  const [serverImageUrls, setServerImageUrls] = useState<string[]>([]);
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

  // 초기 데이터 로드 및 새로고침 시 데이터 로드
  useEffect(() => {
    if (!userId || !rentalId) return;
    fetchImages();
  }, [rentalId, uploadType, userId]);

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

  if (!userId) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const totalCount = serverImageUrls.length + photos.length;

    if (totalCount + filesArray.length > 10) {
      showAlert("최대 10장까지만 업로드할 수 있습니다.", "error");
      return;
    }

    onPhotoChange?.(filesArray);
    e.target.value = "";
  };

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
                {/* 로컬 미리보기를 먼저 표시 (최신순) */}
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

                {/* 서버 이미지를 그 다음에 표시 */}
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
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
