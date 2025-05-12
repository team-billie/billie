import { PostDetailResponseDTO } from "@/types/posts/response";
import axiosInstance from "../../instance";

export const postDetailRequest = async (
  postId: number
): Promise<PostDetailResponseDTO> => {
  try {
    const response = await axiosInstance.get(`/api/v1/posts/${postId}`);
    return response.data;
  } catch (error: any) {
    console.error("게시글 상세 조회 실패:", error);
    throw error;
  }
};
