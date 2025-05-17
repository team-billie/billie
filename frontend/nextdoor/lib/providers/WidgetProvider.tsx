// WidgetProvider.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Next.js 라우터 이벤트 활용
import FloatingWidget from "@/components/common/RentalWidget/FloatingWidget";

const WidgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showWidget, setShowWidget] = useState(false);
  const pathname = usePathname(); // 현재 경로 자동 감지

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("accessToken");
      console.log("TOKEN CHECK:", !!token, token, "Current URL:", pathname);
      setShowWidget(!!token);
    };

    if (typeof window !== "undefined") {
      checkAuthStatus();

      // 페이지 변경이 이미 pathname으로 감지되므로 별도 이벤트 필요 없음

      // 안전장치: 주기적 확인
      const timer = setInterval(checkAuthStatus, 2000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [pathname]); // pathname이 변경될 때마다 실행

  console.log("SHOW WIDGET:", showWidget, "Current URL:", pathname);

  return (
    <>
      {children}
      {showWidget && <FloatingWidget />}
    </>
  );
};

export default WidgetProvider;
