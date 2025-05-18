export interface fetchRentalsRequestDTO {
  userId: number;
  userRole: string;
  condition: string;
  page?: number;
  size?: number;
}

export interface GetReservationDetailRequestDTO {
  reservationId: number;
  startDate: string;
  endDate: string;
  rentalFee: number;
  deposit: number;
  reservationStatus: null;
  ownerId: number;
  renterId: number;
  rentalId: number;
  rentalProcess: string;
  rentalStatus: string;
  title: string;
  productImageUrls: string[];
  createdAt: string;
}
