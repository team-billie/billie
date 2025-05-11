import { RentalProcess, RentalStatus } from "../status";

export interface ReservationResponse {
  reservationId: number;
  startDate: string;
  endDate: string;
  rentalFee: number;
  deposit: number;
  reservationStatus: string | null;
  ownerId: number;
  renterId: number;
  rentalId: number;
  rentalProcess: RentalProcess; // "RENTAL_IN_ACTIVE" 등
  rentalStatus: RentalStatus; // "REMITTANCE_CONFIRMED" 등
  title: string;
  productImageUrl: string;
}

export interface RentalListResponse {
  content: ReservationResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
