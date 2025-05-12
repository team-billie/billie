export interface PostDetailResponseDTO {
  title: string;
  content: string;
  rentalFee: number;
  deposit: number;
  address: string;
  productImage: string[];
  category: string;
  authorId: number | null;
  nickname: string;
}
