export type Category = 
    | '디지털기기'
    | '생활가전'
    | '가구/인테리어'
    | '생활/주방'
    | '유아동'
    | '유아도서'
    | '여성의류'
    | '여성잡화'
    | '남성패션/잡화'
    | '뷰티/미용'
    | '스포츠/레저'
    | '취미/게임/음반'
    | '도서'
    | '티켓/교환권'
    | '가공식품'
    | '건강기능식품'
    | '반려동물용품'
    | '식물'
    | '기타 중고물품';

export interface PostListResponse {
    postId: number;
    title: string;
    productImage: string;
    rentalFee: string;
    deposit: string;
    likeCount: number;
    dealCount: number;
}

export interface PageResponse<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface PostDetailResponse {
    id: number;
    title: string;
    content: string;
    category: string;
    rentalFee: number;
    deposit: number;
    preferredLocation: {
        latitude: number;
        longitude: number;
    };
    address: string;
    authorId: number;
    authorName: string;
    authorProfileImage: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
} 