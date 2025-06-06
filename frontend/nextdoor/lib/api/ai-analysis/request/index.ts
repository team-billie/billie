import { AiAnalysisGetRequestDTO } from "@/types/ai-analysis/response";
import axiosInstance from "../../instance";

//사진 등록 
export const PhotosUploadRequest = async (rentalId: number, uploadType: string, files: File[]) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

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
  } catch(error:any) {
    console.error("사진 등록 실패:", error);
    throw error;
  }
}

//대여 전 사진 분석
export const AiBeforePhotosPostRequest = async (rentalId: number) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/ai/analyze",
      { rentalId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("AI 이미지 분석 결과 조회 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("AI 이미지 분석 요청 실패:", error);
    throw error;
  }
};

//분석 결과 조회
export const AiAnalysisGetRequest = async (
  rentalId: number
): Promise<AiAnalysisGetRequestDTO> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/rentals/${rentalId}/ai-analysis`
    );
    console.log("AI 이미지 분석 결과 조회 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("AI 이미지 분석 결과 조회 실패:", error);
    throw error;
  }
};

//반납 당일 사진 분석
export const AiAfterPhotosPostRequest = async (rentalId: number) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/ai/compare",
      { rentalId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("AI 이미지 분석 요청 실패:", error);

    throw error;
  }
};
