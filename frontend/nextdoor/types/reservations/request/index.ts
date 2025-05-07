export type ReservationStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface ReservationRequestDTO {
  feedId: number;
  startDate: string;
  endDate: string;
}
