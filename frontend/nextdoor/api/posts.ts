import { PageResponse, PostListResponse } from "@/types/posts/response";
import axiosInstance from "@/lib/api/instance";

interface SearchPostsParams {
    keyword?: string;
    address?: string;
    page?: number;
    size?: number;
    sort?: string;
    direction?: 'ASC' | 'DESC';
}

export const searchPosts = async (params: SearchPostsParams): Promise<PageResponse<PostListResponse>> => {
    const response = await axiosInstance.get('/api/posts/search', { params });
    return response.data;
}; 