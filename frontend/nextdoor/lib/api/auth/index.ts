import axios from "axios";
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

const getRegionInfo = (x: number, y: number) => {
    return axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
        {
            headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
            }
        }
    ).then((res) => {
        return res.data.documents.find((doc: any) => doc.region_type === 'B')
    }).catch((error) => {
        handleApiError(error, "getRegionInfo");
    });
}

export { getUserInfo, getRegionInfo };

