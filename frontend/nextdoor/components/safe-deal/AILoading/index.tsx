"use client";

import { useEffect, useState } from "react";

const steps = [
    "AI를 통해 대여 품목 상태를 분석 중이에요...",
    "대여 전 사진과 반납 사진을 매핑하고 있어요!",
    "스크래치, 오염, 찍힘 여부를 판별 중...",
    "손상 위치를 정밀 탐색 중입니다...",
    "비포 & 애프터 사진 비교 중!",
    "AI가 손상 여부를 판단하고 있어요!",
    "결과 요약 중...",
    "보증금 처리 정보를 정리하고 있어요!"
];

export default function AILoading() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // 애니메이션 스타일
    const starStyle = {
        animation: "star-bounce 3s ease-in-out infinite",
    };

    const glowStyle = {
        animation: "glow-pulse 4s ease-in-out infinite",
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center h-full">
            {/* 화려한 배경과 함께 역동적인 별 */}
            <div className="relative flex items-center justify-center w-32 h-32">
                {/* 메인 별 주변 발광 효과 */}
                <div
                    className="absolute w-16 h-16 bg-blue-300 rounded-full filter blur-lg opacity-30"
                    style={glowStyle}
                ></div>

                {/* 확장되는 파동 효과 (큰 원) */}
                <div className="absolute w-6 h-6 bg-blue-200 rounded-full opacity-0" style={{ animation: "ripple 2.5s linear infinite" }}></div>
                <div className="absolute w-6 h-6 bg-blue-200 rounded-full opacity-0" style={{ animation: "ripple 2.5s linear infinite 1.25s" }}></div>

                {/* 회전하는 작은 점들 (궤도) */}
                <div className="absolute w-24 h-24 rounded-full" style={{ animation: "slow-spin 8s linear infinite" }}>
                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 -ml-1 bg-blue-400 rounded-full opacity-70"></div>
                    <div className="absolute bottom-0 left-1/2 w-1 h-1 -ml-0.5 bg-blue-300 rounded-full opacity-60"></div>
                </div>
                <div className="absolute w-20 h-20 rounded-full" style={{ animation: "reverse-spin 6s linear infinite" }}>
                    <div className="absolute top-0 left-1/2 w-1 h-1 -ml-0.5 bg-blue-300 rounded-full opacity-70"></div>
                    <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 -ml-1 bg-blue-400 rounded-full opacity-60"></div>
                </div>

                {/* 랜덤하게 움직이는 파티클들 */}
                <div className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full opacity-70" style={{ animation: "float-particle 4s ease-in-out infinite", top: "15%", right: "20%" }}></div>
                <div className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-60" style={{ animation: "float-particle 3.5s ease-in-out infinite 0.7s", bottom: "20%", left: "15%" }}></div>
                <div className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-70" style={{ animation: "float-particle 4.5s ease-in-out infinite 1.5s", top: "25%", left: "25%" }}></div>
                <div className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-60" style={{ animation: "float-particle 3s ease-in-out infinite 1s", bottom: "25%", right: "30%" }}></div>

                {/* 반짝이는 폭죽 효과 */}
                <div className="absolute w-1 h-1 bg-white rounded-full" style={{ animation: "sparkle 3s ease-out infinite", top: "10%", left: "30%" }}></div>
                <div className="absolute w-1 h-1 bg-white rounded-full" style={{ animation: "sparkle 3s ease-out infinite 1s", bottom: "15%", right: "25%" }}></div>
                <div className="absolute w-0.5 h-0.5 bg-white rounded-full" style={{ animation: "sparkle 3s ease-out infinite 2s", top: "30%", right: "15%" }}></div>
                <div className="absolute w-0.5 h-0.5 bg-white rounded-full" style={{ animation: "sparkle 3s ease-out infinite 0.5s", bottom: "30%", left: "10%" }}></div>

                {/* 메인 별 이미지 */}
                <img
                    src="/images/blueStar.png"
                    alt="ai-loading"
                    className="w-14 h-14 relative z-10"
                    style={starStyle}
                />
            </div>
            <div className="text-gray600 text-sm mt-2">{steps[currentStep]}</div>

            {/* 애니메이션 키프레임 정의 */}
            <style jsx global>{`
                @keyframes star-bounce {
                    0%, 100% { 
                        transform: translate(0, 0) rotate(0deg) scale(1);
                    }
                    15% {
                        transform: translate(5px, -5px) rotate(3deg) scale(1.03);
                    }
                    30% { 
                        transform: translate(-4px, 7px) rotate(-2deg) scale(0.98); 
                    }
                    45% { 
                        transform: translate(-7px, -3px) rotate(1deg) scale(1.02);
                    }
                    60% { 
                        transform: translate(7px, 5px) rotate(-3deg) scale(0.97);
                    }
                    75% { 
                        transform: translate(3px, -7px) rotate(2deg) scale(1.04);
                    }
                    90% {
                        transform: translate(-5px, -2px) rotate(-1deg) scale(0.99);
                    }
                }
                
                @keyframes glow-pulse {
                    0%, 100% {
                        opacity: 0.2;
                        transform: scale(0.9);
                    }
                    50% {
                        opacity: 0.4;
                        transform: scale(1.1);
                    }
                }
                
                @keyframes float-particle {
                    0%, 100% {
                        transform: translate(0, 0);
                        opacity: 0.4;
                    }
                    25% {
                        transform: translate(-8px, 8px);
                        opacity: 0.7;
                    }
                    50% {
                        transform: translate(8px, 12px);
                        opacity: 0.9;
                    }
                    75% {
                        transform: translate(12px, -8px);
                        opacity: 0.6;
                    }
                }
                
                @keyframes ripple {
                    0% {
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    100% {
                        transform: scale(7);
                        opacity: 0;
                    }
                }
                
                @keyframes slow-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                
                @keyframes sparkle {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    20% {
                        transform: scale(3);
                        opacity: 0.8;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    70% {
                        transform: scale(2);
                        opacity: 0.6;
                    }
                    100% {
                        transform: scale(0);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}