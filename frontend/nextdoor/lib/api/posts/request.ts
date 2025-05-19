import axiosInstance from "@/lib/api/instance";
import { Category } from "@/types/posts/response";

interface AnalyzeProductImageResponse {
    title: string;
    content: string;
    category: Category;
}

interface CreatePostRequest {
    title: string;
    content: string;
    category: Category;
    rentalFee: number;
    deposit: number;
    preferredLocation: {
        latitude: number;
        longitude: number;
    };
    address: string;
}

export const analyzeProductImage = async (image: File): Promise<AnalyzeProductImageResponse> => {
    const formData = new FormData();
    formData.append('image', image);
    
    const response = await axiosInstance.post('/api/v1/posts/analyze-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data;
};

export const createPost = async (postData: CreatePostRequest, images: File[]): Promise<void> => {
    const formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(postData)], { type: 'application/json' }));
    
    images.forEach((image) => {
        formData.append('images', image);
    });

    await axiosInstance.post('/api/v1/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const postDetailRequest = async (postId: string | number) => {
    const response = await axiosInstance.get(`/api/v1/posts/${postId}`);
    return response.data;
};