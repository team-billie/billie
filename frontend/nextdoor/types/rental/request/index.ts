export interface fetchRentalsRequestDTO {
  userId: number;
  userRole: string;
  condition: string;
  page?: number;
  size?: number;
}
