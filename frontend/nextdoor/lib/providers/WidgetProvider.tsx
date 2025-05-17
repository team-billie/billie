// 앱 전체에서 위젯 제공
'use client';

import React, { useEffect, useState } from 'react';
import FloatingWidget from '@/components/common/RentalWidget/FloatingWidget';

const WidgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showWidget, setShowWidget] = useState(false);
  
  // 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('accessToken');
      console.log("TOKEN CHECK:", !!token, token); // 디버깅용
      setShowWidget(!!token); // 토큰이 있으면 위젯 표시
    };
    
    // 초기 확인
    if (typeof window !== 'undefined') {
      checkAuthStatus();
      
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'accessToken') {
          console.log("Storage change detected:", e.key, e.newValue);
          checkAuthStatus();
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      const timer = setTimeout(() => {
        checkAuthStatus();
      }, 1000);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearTimeout(timer);
      };
    }
  }, []);

  console.log("SHOW WIDGET:", showWidget); // 디버깅용
  
  return (
    <>
      {children}
      {showWidget && <FloatingWidget />}
    </>
  );
};

export default WidgetProvider;


