import axiosInstance from "../../instance";
import { PostDetailResponseDTO } from "@/types/posts/response";
import { PostCreateRequestDTO } from "@/types/posts/request";

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

export const postCreateRequest = async (
  post: PostCreateRequestDTO,
  images: File[] | null,
  userId: number | null
) => {
  try {
    console.log("post", post);
    const formData = new FormData();

    const postBlob = new Blob([JSON.stringify(post)], {
      type: "application/json",
    });
    formData.append("post", postBlob);

    if (images) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await axiosInstance.post("/api/v1/posts", formData, {
      params: {
        authorId: userId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("예약 생성 실패:", error);
    throw error;
  }
};
