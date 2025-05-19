import { AiAnalysisGetRequestDTO } from "@/types/ai-analysis/response";
import axiosInstance from "../../instance";

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
    alert("AI 이미지 분석 요청이 완료되었습니다 ✅"); // ✅ 알림 추가
    return response.data;
  } catch (error: any) {
    console.error("AI 이미지 분석 요청 실패:", error);
    alert("AI 이미지 분석 요청에 실패했습니다 ❌");
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
    console.log("AI 이미지 분석 결과 조회 성공");
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
    alert("AI 이미지 비교 분석 요청이 완료되었습니다 ✅"); // ✅ 알림 추가
    return response.data;
  } catch (error: any) {
    console.error("AI 이미지 분석 요청 실패:", error);
    alert("AI 이미지 분석 요청에 실패했습니다 ❌");
    throw error;
  }
};
