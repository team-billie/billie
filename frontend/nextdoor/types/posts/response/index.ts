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