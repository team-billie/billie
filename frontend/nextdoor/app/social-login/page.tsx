"use client"

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getUserInfo } from '@/lib/api/auth';
import useUserStore from '@/lib/store/useUserStore';
import { GetUserInfoResponse } from '@/types/auth/response';
import { GetAddedListRequest } from '@/lib/api/pays';
import { AddAccountResponseDto } from '@/types/pays/response';
import LoadingIcon from '@/components/common/LoadingIcon';

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
    const accessToken = searchParams.get("accessToken");
    const userKey = searchParams.get("userKey");
    const uuid = searchParams.get("uuid");

    if (accessToken && userKey && uuid) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userKey', userKey);
      localStorage.setItem('uuid', uuid);
      
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

  return (<div className='flex flex-col bg-blue100 items-center justify-center h-[100dvh] pb-20'>
    <LoadingIcon/>
    <div className='text-blue300 text-2xl font-bold'>Loading</div>
  </div>);
}