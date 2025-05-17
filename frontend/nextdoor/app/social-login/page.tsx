"use client"

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getUserInfo } from '@/lib/api/auth';
import useUserStore from '@/lib/store/useUserStore';
import { GetUserInfoResponse } from '@/types/auth/response';
import { GetAddedListRequest } from '@/lib/api/pays';
import { AddAccountResponseDto } from '@/types/pays/response';

function getPrimaryAccount(accounts: AddAccountResponseDto[]) {
  return accounts.find(account => account.isPrimary === true);
}

export default function OAuthRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setUserKey = useUserStore((state) => state.setUserKey);
  const setMainAccount = useUserStore((state) => state.setMainAccount);
  const setBillyAccount = useUserStore((state) => state.setBillyAccount);
  const setAddedAccounts = useUserStore((state) => state.setAddedAccounts);
  

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const userKey = searchParams.get('userKey');

    if (accessToken && userKey) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userKey', userKey);
      
      getUserInfo().then((res: GetUserInfoResponse) => {
        console.log(res);
        setUserKey(userKey);
        setUser(res);
      });
      router.push('/home');

      GetAddedListRequest(userKey).then((res: AddAccountResponseDto[]) => {
        console.log(res);
        const primaryAccount = getPrimaryAccount(res);
        
        setMainAccount(primaryAccount || null);
        setBillyAccount(res[0]);

        if (res.length > 1) {
          setAddedAccounts(res.slice(1));
        }
      });
    } else {
      console.error('Access token not found');
      router.push('/login');
    }
  }, [searchParams, router]);

  return <div>로그인 중입니다...</div>;
}