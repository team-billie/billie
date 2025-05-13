"use client"

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getUserInfo } from '@/lib/api/auth';

export default function OAuthRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      getUserInfo().then((res) => {
        console.log(res);
      });
      router.push('/home');
    } else {
      console.error('Access token not found');
      router.push('/login');
    }
  }, [searchParams, router]);

  return <div>로그인 중입니다...</div>;
}