"use client";

import { RENTAL_PROCESS, RentalProcess } from "@/types/rental";
import React from "react";

interface TimelineBarProps {
  currentStep: RentalProcess;
}

export default function TimelineBar({
  currentStep = RENTAL_PROCESS.RENTAL_IN_ACTIVE,
}: TimelineBarProps) {
  console.log(currentStep);
  // 프로세스에 따른 퍼센트 계산
  const processToPercent = (process: RentalProcess): number => {
    switch (process) {
      case RENTAL_PROCESS.BEFORE_RENTAL:
        return 0;
      case RENTAL_PROCESS.RENTAL_IN_ACTIVE:
        return 33.33;
      case RENTAL_PROCESS.RETURNED:
        return 66.66;
      case RENTAL_PROCESS.RENTAL_COMPLETED:
        return 100;
      default:
        return 0;
    }
  };

  // 상태 텍스트 반환
  const getStatusText = (process: RentalProcess): string => {
    switch (process) {
      case RENTAL_PROCESS.BEFORE_RENTAL:
        return "안심 거래 중";
      case RENTAL_PROCESS.RENTAL_IN_ACTIVE:
        return "거래 중";
      case RENTAL_PROCESS.RETURNED:
        return "반납 중";
      case RENTAL_PROCESS.RENTAL_COMPLETED:
        return "완료";
      default:
        return "안심 거래 중";
    }
  };

  // 마커 색상 결정
  const getCircleClasses = (step: RentalProcess) => {
    const processOrder = [
      RENTAL_PROCESS.BEFORE_RENTAL,
      RENTAL_PROCESS.RENTAL_IN_ACTIVE,
      RENTAL_PROCESS.RETURNED,
      RENTAL_PROCESS.RENTAL_COMPLETED,
    ];
    const currentIndex = processOrder.indexOf(currentStep);
    const stepIndex = processOrder.indexOf(step);

    return currentIndex >= stepIndex
      ? "bg-blue300 border-blue300 border-2"
      : "bg-white border-gray300 border-2";
  };

  const percent = processToPercent(currentStep);
  const statusText = getStatusText(currentStep);

  // 각 단계의 정보를 배열로 정의
  const steps = [
    { value: RENTAL_PROCESS.BEFORE_RENTAL, left: "0%" },
    { value: RENTAL_PROCESS.RENTAL_IN_ACTIVE, left: "33.33%" },
    { value: RENTAL_PROCESS.RETURNED, left: "66.66%" },
    { value: RENTAL_PROCESS.RENTAL_COMPLETED, left: "100%" },
  ];

  // 원 마커 렌더링 함수
  const renderCircleMarker = (step: RentalProcess, position: string) => {
    return (
      <React.Fragment key={step}>
        {/* 외부 원 마커 */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border ${getCircleClasses(
            step
          )}`}
          style={{ left: position }}
        />
        {/* 내부 원 마커 */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white`}
          style={{ left: position }}
        />
      </React.Fragment>
    );
  };

  return (
    <div className="w-full flex flex-col -mt-8 p-4 gap-2">
      <div className="text-blue-400 font-bold">{statusText}</div>
      <div className="w-full px-2">
        {/* 프로그레스 바 컨테이너 */}
        <div className="relative w-full h-3 bg-gray-200 ">
          {/* 채워진 프로그레스 바 */}
          <div
            className="h-full bg-blue-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />

          {/* 동그라미 마커 렌더링 */}
          {steps.map((step) => renderCircleMarker(step.value, step.left))}
        </div>
      </div>
    </div>
  );
}
