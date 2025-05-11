export type ReservationStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface ReservationRequestDTO {
  postId: number;
  startDate: string;
  endDate: string;
}
