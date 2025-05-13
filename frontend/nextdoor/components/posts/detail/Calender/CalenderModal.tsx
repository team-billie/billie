"use client";

import { formatDateRange, formatDateWithDay } from "@/lib/utils";
import React, { RefObject, useState } from "react";
import CalendarMonth from "./CalenderMonth";

interface CalendarModalProps {
  calendarRef: RefObject<HTMLDivElement>;
  onClose: () => void;
  startDate: Date | null;
  endDate: Date | null;
  selectedDates: Date[];
  rentalFee: number;
  deposit: number;
  onDateSelect: (year: number, month: number, day: number) => void;
  onConfirm: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  calendarRef,
  onClose,
  startDate,
  endDate,
  selectedDates,
  rentalFee,
  deposit,
  onDateSelect,
  onConfirm,
}) => {
  const today = new Date();
  const [currentViewMonth, setCurrentViewMonth] = useState<number>(
    today.getMonth()
  );
  const [currentViewYear, setCurrentViewYear] = useState<number>(
    today.getFullYear()
  );

  // 이전 달 이동
  const goToPrevMonth = () => {
    if (currentViewMonth === 0) {
      setCurrentViewMonth(11);
      setCurrentViewYear(currentViewYear - 1);
    } else {
      setCurrentViewMonth(currentViewMonth - 1);
    }
  };

  // 다음 달 이동
  const goToNextMonth = () => {
    if (currentViewMonth === 11) {
      setCurrentViewMonth(0);
      setCurrentViewYear(currentViewYear + 1);
    } else {
      setCurrentViewMonth(currentViewMonth + 1);
    }
  };

  //과거 달 이동 불가
  const isPrevMonthDisabled = () => {
    const today = new Date();
    const prevMonth = currentViewMonth === 0 ? 11 : currentViewMonth - 1;
    const prevYear =
      currentViewMonth === 0 ? currentViewYear - 1 : currentViewYear;

    return (
      prevYear < today.getFullYear() ||
      (prevYear === today.getFullYear() && prevMonth < today.getMonth())
    );
  };

  // (이용료*일수) 가격 측정
  const selectedDaysCount = selectedDates.length;
  const totalPrice = selectedDaysCount * rentalFee + deposit;

  const getInstructionMessage = () => {
    if (!startDate) return "대여 시작일을 선택해주세요.";
    if (!endDate) return "대여 종료일을 선택해주세요.";
    return `선택된 날짜: ${formatDateWithDay(startDate)} - ${formatDateWithDay(
      endDate
    )}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-out">
      <div
        ref={calendarRef}
        className="bg-white rounded-lg p-4 w-11/12 max-w-md max-h-90 overflow-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100"
        style={{
          animation: "both 300ms ease-out",
          animationName: "fadeInUp",
        }}
      >
        {/* Animation keyframes added as inline style */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">예약 일정 설정</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Calendar Instructions */}
        <div className="text-sm text-gray-600 mb-4">
          {getInstructionMessage()}
        </div>

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPrevMonth}
            disabled={isPrevMonthDisabled()}
            className={`p-2 rounded-full ${
              isPrevMonthDisabled()
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="text-lg font-medium">
            {currentViewYear}년 {currentViewMonth + 1}월
          </div>

          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="mb-4">
          <CalendarMonth
            year={currentViewYear}
            month={currentViewMonth}
            selectedDates={selectedDates}
            startDate={startDate}
            endDate={endDate}
            onDateSelect={onDateSelect}
          />
        </div>

        {/* Reservation Details */}
        {selectedDates.length > 0 && (
          <div className="border-t pt-4 mt-2">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">사용 예정 일정</span>
              <span className="text-sm">
                {formatDateRange(
                  selectedDates[0],
                  selectedDates.length > 1
                    ? selectedDates[selectedDates.length - 1]
                    : selectedDates[0]
                )}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">총 대여일</span>
              <span>{selectedDaysCount}일</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-bold">총 금액</span>
              <span className="font-bold">₩{totalPrice.toLocaleString()}</span>
            </div>
            <button
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
              onClick={onConfirm}
            >
              예약하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarModal;
