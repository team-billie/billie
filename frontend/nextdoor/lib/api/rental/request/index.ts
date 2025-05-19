import {
  fetchRentalsRequestDTO,
  GetReservationDetailRequestDTO,
} from "@/types/rental/request";
import axiosInstance from "../../instance";

export const fetchRentals = async (params: fetchRentalsRequestDTO) => {
  try {
    const response = await axiosInstance.get("/api/v1/rentals", {
      headers: {
        "Content-Type": "application/json",
      },
      params,
    });
    return response.data.content;
  } catch (error: any) {
    console.error("예약 조회 실패:", error);
    throw error;
  }
};

export const GetReservationDetailRequest = async (
  rentalId: number
): Promise<GetReservationDetailRequestDTO> => {
  try {
    const res = await axiosInstance.get(`/api/v1/rentals/${rentalId}`);
    return res.data;
  } catch (error: any) {
    console.error("예약 조회 실패:", error);
    throw error;
  }
};
