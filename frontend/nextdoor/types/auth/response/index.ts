

type GetUserInfoResponse = {
    id: number;
    email: string;
    birth: string;
    gender: string;
    address: string | null;
    profileImageUrl: string;
    accountId: string | null;
    nickname: string;
    authProvider: string;
}

export type { GetUserInfoResponse };
