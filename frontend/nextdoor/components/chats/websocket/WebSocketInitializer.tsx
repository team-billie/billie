"use client";

import { useEffect } from 'react';
import useUserStore from '@/lib/store/useUserStore'; 

export default function WebSocketInitializer() {
  const { userId, setUser } = useUserStore(); 
  
  useEffect(() => {
    // 기본 사용자 ID가 없을 경우에만 테스트 사용자로 설정
    if (!userId) {
      console.log(`기본 테스트 사용자 ID를 설정합니다.`);
      setUser(
        100, // 기본 테스트 ID
        '테스트사용자',
        '/images/profileimg.png'
      );
    }
  }, [userId, setUser]);
  
  return null;
}