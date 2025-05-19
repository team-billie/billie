"use client";

import { useEffect, useState } from "react";
import LoadingIcon from "@/components/common/LoadingIcon";

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

    return (
        <div className="flex flex-col gap-2 justify-center items-center h-full">
            <LoadingIcon/>
            <div className="text-gray600 text-sm mt-2">{steps[currentStep]}</div>
        </div>
    );
}