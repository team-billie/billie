type PostListItem = {
    title: string;
    productImage: string;
    rentalFee: string;
    deposit: string;
    like: number;
    dealCount: number;
}

type PostListResponseDto = {
    content: PostListItem[];
}

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