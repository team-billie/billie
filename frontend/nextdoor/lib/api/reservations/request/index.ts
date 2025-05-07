import { ReservationRequestDTO } from "@/types/reservations/request";
import axiosInstance from "../../instance";

export const createReservation = async (data: ReservationRequestDTO) => {
  try {
    const response = await axiosInstance.post("/api/v1/reservations", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("예약 생성 실패:", error);
    throw error;
  }
};
