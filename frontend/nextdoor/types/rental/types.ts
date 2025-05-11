import { RentalStatus } from "./status";

export type UserType = "OWNER" | "RENTER";

export interface RentalItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  depositAmount: number;
  images: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RentalRequest {
  id: number;
  rentalItemId: number;
  renterId: string;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  totalAmount: number;
  depositAmount: number;
  createdAt: string;
  updatedAt: string;
}
