"use client";

import React from "react";

interface TimelineBarProps {
  currentStep: number; // 현재 단계 (1-4)
}

export default function TimelineBar({ currentStep = 2 }: TimelineBarProps) {
  // 유효한 단계로 제한 (1-4)
  const validStep = Math.min(Math.max(1, currentStep), 4);

  // 단계에 따른 퍼센트 계산
  const stepToPercent = (step: number): number => {
    switch (step) {
      case 1:
        return 0; // 1단계는 시작점
      case 2:
        return 33.33; // 2단계
      case 3:
        return 66.66; // 3단계
      case 4:
        return 100; // 4단계 (완료)
      default:
        return 0;
    }
  };

  // 단계에 따른 상태 텍스트 반환
  const getStatusText = (step: number): string => {
    switch (step) {
      case 1:
        return "안심 거래 중"; // 1단계
      case 2:
        return "거래 중"; // 2단계
      case 3:
        return "반납 중"; // 3단계
      case 4:
        return "완료"; // 4단계
      default:
        return "안심 거래 중";
    }
  };

  const percent = stepToPercent(validStep);
  const statusText = getStatusText(validStep);

  // 각 단계의 위치에 있는 원의 색상 결정
  const getCircleClasses = (step: number) => {
    return validStep >= step
      ? "bg-blue300 border-blue300"
      : "bg-white border-gray300";
  };

  return (
    <div className="w-full flex flex-col  p-4 gap-2">
      <div className="text-blue400 font-bold">{statusText}</div>
      <div className="w-full px-2">
        {/* 프로그레스 바 컨테이너 */}
        <div className="relative w-full h-3 bg-gray-200 ">
          {/* 채워진 프로그레스 바 */}
          <div
            className="h-full bg-blue-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />

          {/* 첫 번째 원 마커 (1단계) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border ${getCircleClasses(
              1
            )}`}
            style={{ left: "0%" }}
          />
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full  bg-white`}
            style={{ left: "0%" }}
          />

          {/* 두 번째 원 마커 (2단계) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border ${getCircleClasses(
              2
            )}`}
            style={{ left: "33.33%" }}
          />
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full  bg-white`}
            style={{ left: "33.33%" }}
          />
          {/* 세 번째 원 마커 (3단계) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border ${getCircleClasses(
              3
            )}`}
            style={{ left: "66.66%" }}
          />
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white`}
            style={{ left: "66.66%" }}
          />
          {/* 네 번째 원 마커 (4단계) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border ${getCircleClasses(
              4
            )}`}
            style={{ left: "100%" }}
          />
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full  bg-white`}
            style={{ left: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
