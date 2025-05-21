// WidgetProvider.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import FloatingWidget from "@/components/common/RentalWidget/FloatingWidget";

const WidgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showWidget, setShowWidget] = useState(false);
  const pathname = usePathname(); 

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("accessToken");
      // console.log("TOKEN CHECK:", !!token, token, "Current URL:", pathname);
      setShowWidget(!!token);
    };

    if (typeof window !== "undefined") {
      checkAuthStatus();


    
      const timer = setInterval(checkAuthStatus, 2000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [pathname]); 

  console.log("SHOW WIDGET:", showWidget, "Current URL:", pathname);

  return (
    <>
      {children}
      {showWidget && <FloatingWidget />}
    </>
  );
};

export default WidgetProvider;
