import axiosInstance from "../instance";
import { GetUserInfoResponse } from "@/types/auth/response";

const handleApiError = (error: any, name: string) => {
    console.error(`${name} API 요청 중 오류가 발생했습니다.`, error);
    throw new Error(error.response?.data?.message || `${name} API 요청 중 오류가 발생했습니다.`);
  };

const getUserInfo = () => {
    return axiosInstance.get("/api/v1/members").then((res) => {
        return res.data
    }).catch((error) => {
        handleApiError(error, "getUserInfo");
    });
}

export { getUserInfo };

