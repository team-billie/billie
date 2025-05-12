import axiosInstance from "../instance";

// 공통 에러 처리 함수
const handleApiError = (error: any, name: string) => {
    console.error(`${name} API 요청 중 오류가 발생했습니다.`, error);
    throw new Error(error.response?.data?.message || `${name} API 요청 중 오류가 발생했습니다.`);
};

// 게시글 목록 조회
export const GetPostListRequest = (rentalId: string) => 
    axiosInstance.get(`/api/v1/rentals/${rentalId}/request-remittance`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return handleApiError(error, "게시글 목록 조회");
});
