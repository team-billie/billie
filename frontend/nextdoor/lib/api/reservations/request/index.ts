import { ReservationRequestDTO } from "@/types/reservations/request";
import axios from "axios";

export const createReservation = async (data: ReservationRequestDTO) => {
  try {
    const response = await axios.post(
      "http://k12e205.p.ssafy.io:8081/api/v1/reservations",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("예약 생성 실패:", error);
    throw error;
  }
};
