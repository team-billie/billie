import axiosInstance from "../instance";

// 공통 에러 처리 함수
const handleApiError = (error: any, name: string) => {
  console.error(`${name} API 요청 중 오류가 발생했습니다.`, error);
  throw new Error(
    error.response?.data?.message || `${name} API 요청 중 오류가 발생했습니다.`
  );
};

// 게시글 목록 조회
export const GetPostListRequest = (
  userId: string,
  page: number = 0,
  size: number = 10,
  sorted: string = "desc"
) =>
  //파라미터 sorted 넣기
  axiosInstance
    .get(`/api/v1/posts`, {
      params: {
        userId,
        page,
        size,
        sorted: "desc",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return handleApiError(error, "게시글 목록 조회");
    });
