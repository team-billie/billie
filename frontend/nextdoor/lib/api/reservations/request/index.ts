import { ReservationRequestDTO } from "@/types/reservations/request";
import axiosInstance from "../../instance";

export const createReservation = async (
  data: ReservationRequestDTO,
  userId: number | null
) => {
  try {
    const response = await axiosInstance.post("/api/v1/reservations", data, {
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": userId,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("예약 생성 실패:", error);
    throw error;
  }
};

export const fetchOwnerReservations = async (userId: number) => {
  try {
    const response = await axiosInstance.get("/api/v1/reservations/received", {
      params: {
        status: "PENDING",
        cursorId: "",
        pageSize: 10,
      },
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("예약 목록 요청 실패", error);
    throw error;
  }
};

export const fetchRenterReservations = async (userId: number) => {
  try {
    const response = await axiosInstance.get("/api/v1/reservations/sent", {
      params: {
        status: "PENDING",
        cursorId: "",
        pageSize: 10,
      },
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("예약 목록 요청 실패", error);
    throw error;
  }
};
