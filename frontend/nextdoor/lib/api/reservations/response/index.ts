interface ReservationResponseDTO {
  reservationId: number;
  startDate: string;
  endDate: string;
  rentalFee: number;
  deposit: number;
  reservationStatus: string;
  ownerId: number;
  renterId: number;
  rentalId: number;
  rentalStatus: string;
  rentalProcess: string;
  title: string;
  productImageUrls: string[];
}
