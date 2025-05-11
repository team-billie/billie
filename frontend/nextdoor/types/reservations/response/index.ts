export interface ReservationResponseDTO {
  feedTitle: string;
  feedProductImage: string | null;
  startDate: string; // ISO 형식 "2025-01-01"
  endDate: string;
  rentalFee: number;
  deposit: number;
  status: "PENDING" | "CONFIRMED" | "RETURNED" | "COMPLETED"; // 상태값 추가 가능
  ownerName: string;
  ownerProfileImageUrl: string;
}
