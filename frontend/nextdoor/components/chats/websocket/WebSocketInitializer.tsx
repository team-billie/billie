"use client";

import { useEffect } from 'react';
import { useChatStore } from '@/lib/store/useChatStore';
import { useTestUserStore } from '@/lib/store/useTestUserStore';

export default function WebSocketInitializer() {
  const { userId, setUser } = useChatStore();
  const testUserId = useTestUserStore((state) => state.userId);
  
  useEffect(() => {
    if (testUserId && !userId) {
      console.log(`테스트 사용자 ID(${testUserId})를 채팅 스토어에 설정합니다.`);
      setUser(
        Number(testUserId),
        '테스트사용자',
        '/images/profileimg.png'
      );
    }
  }, [testUserId, userId, setUser]);
  
  return null;
}