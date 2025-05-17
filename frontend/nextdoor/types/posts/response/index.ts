type PostListItemDto = {
  postId: number;
  title: string;
  productImage: string;
  rentalFee: string;
  deposit: string;
  likeCount: number;
  dealCount: number;
};

type GetPostListResponseDto = {
  content: PostListItemDto[];
};

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

export type { GetPostListResponseDto, PostListItemDto };
