"use client";

import { useEffect } from 'react';
import useUserStore from '@/lib/store/useUserStore'; 

export default function WebSocketInitializer() {
  const { userId, setUser } = useUserStore(); 
  
  useEffect(() => {
    if (!userId) {
      console.log(`기본 테스트 사용자 ID를 설정합니다.`);
      setUser(
        {
          id: 100,
          nickname: '테스트사용자',
          profileImageUrl: '/images/profileimg.png',
          address: null,
          email: '',
          birth: '',
          gender: '',
          accountId: null,
          authProvider: 'TEST'
        }
      );
    }
  }, [userId, setUser]);
  
  return null;
}