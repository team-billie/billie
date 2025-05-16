import axiosInstance from "../../instance";

//대여 전 사진 분석
export const AiBeforePhotosRequest = async (rentalId: number) => {
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

//반납 당일 사진 분석
export const AiAfterPhotosRequest = async (rentalId: number) => {
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
