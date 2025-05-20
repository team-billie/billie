"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleGuestStart = () => {
    router.push("/home"); // 홈 페이지로 이동
  };

  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/oauth2/authorization/kakao?redirectUrl=${baseUrl}`;
  };

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-blue300 to-blue200 flex justify-center px-5">
      <div className="w-full max-w-[400px] py-12 text-white flex flex-col">
        <h1 className="text-4xl font-bold mt-12 flex-1">옆집 물건</h1>

        <div className="text-2xl font-bold mb-10">
          <div className="mb-2">원하는 물건을</div>
          <div className="mb-2">언제든지 어디서든</div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleKakaoLogin}
            className="w-full py-5 bg-[#FEE500] hover:bg-[#FDD835] rounded-lg text-black font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <svg
              aria-label="Kakao logo"
              width="18"
              height="18"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#181600"
                d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"
              ></path>
            </svg>
            카카오로 3초 만에 시작하기
          </button>

          {/* <button 
            className="w-full py-5 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
            onClick={handleGuestStart}
            >
            비회원으로 시작하기
          </button> */}
          {/* <button 
            className="w-full py-5 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
            onClick={() => {
              router.push('/pays/testlogin');
            }}
            >
            테스트 유저 로그인
          </button> */}
        </div>
      </div>
    </div>
  );
}
