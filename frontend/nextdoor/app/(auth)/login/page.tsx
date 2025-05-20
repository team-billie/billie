"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const handleKakaoLogin = () => {
    window.location.href = `http://k12e205.p.ssafy.io:8081/api/v1/auth/oauth2/authorization/kakao?redirectUrl=${baseUrl}`;
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-gradient-to-b from-[#81AEF3] to-gray100 flex justify-center px-5 overflow-hidden font-local-geekble">
      {/* vector 이미지: 하단 고정 */}
      <Image
        src="/images/vector.png"
        alt="배경"
        width={320}
        height={320}
        className="absolute bottom-0 left-0 object-contain pointer-events-none select-none"
      />

      {/* 콘텐츠 박스 */}
      <div className="w-full max-w-[400px] py-12 text-white flex flex-col justify-end z-10 relative">
        {/* 팀 로고 */}
        <Image
          src="/images/teamlogo.png"
          alt="로고"
          width={200}
          height={200}
          className="absolute top-10 right-1"
        />

        <div className="absolute bottom-56 left-12 text-[25px] leading-tight text-white z-10">
          <p className="mb-1">원하는 물건을</p>
          <p>언제든지 안전하게</p>
        </div>

        {/* 카카오 로그인 버튼 */}
        <div className="mt-auto pb-10 z-10">
          <button
            onClick={handleKakaoLogin}
            className="w-full py-5 px-4 bg-[#FEE500] hover:bg-[#FDD835] rounded-full text-black font-bold font-sans flex items-center justify-center gap-2 transition-colors"
          >
            {/* 카카오 아이콘 */}
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

      {/* 👇 이 페이지에만 폰트 적용 */}
      <style jsx global>{`
        @font-face {
          font-family: "GeekbleMalang";
          src: url("/fonts/GeekbleMalang2TTF.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
        }
        .font-local-geekble {
          font-family: "GeekbleMalang", sans-serif;
        }
      `}</style>
    </div>
  );
}
