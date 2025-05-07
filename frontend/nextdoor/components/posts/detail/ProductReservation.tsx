"use client";

import { useEffect, useRef, useState } from "react";
import CalendarModal from "./Calender/CalenderModal";

export default function ProductReservation() {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close calendar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Handle date selection
  const handleDateSelect = (year: number, month: number, day: number) => {
    const selectedDate = new Date(year, month, day);

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(selectedDate);
      setEndDate(null);
      setSelectedDates([selectedDate]);
    } else {
      // Complete the selection
      if (selectedDate < startDate) {
        setEndDate(startDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }

      // Generate all dates in the range
      const dateRange: Date[] = [];
      const currentDate = new Date(
        selectedDate < startDate ? selectedDate : startDate
      );
      const lastDate = new Date(
        selectedDate < startDate ? startDate : selectedDate
      );

      while (currentDate <= lastDate) {
        dateRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setSelectedDates(dateRange);
    }
  };

  // Handle reservation confirmation
  const handleConfirmReservation = () => {
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일`;
    };

    if (selectedDates.length > 0) {
      alert(
        `${formatDate(selectedDates[0])}부터 ${formatDate(
          selectedDates[selectedDates.length - 1]
        )}까지 예약이 완료되었습니다.`
      );
      setShowCalendar(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full  flex justify-between p-3 bg-white">
        <div>
          <div>
            <span className="text-xl">₩ 20,000</span>
            <span> / 일 </span>
          </div>
          <div>
            <span>보증금</span>
            <span className="text-xl"> ₩ 100,000</span>
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-blue400 to-blue300 text-white flex items-center px-10 rounded-full"
          onClick={toggleCalendar}
        >
          예약하기
        </div>
      </div>
      {/* 달력*/}
      {showCalendar && (
        <CalendarModal
          calendarRef={calendarRef}
          onClose={() => setShowCalendar(false)}
          startDate={startDate}
          endDate={endDate}
          selectedDates={selectedDates}
          onDateSelect={handleDateSelect}
          onConfirm={handleConfirmReservation}
        />
      )}
    </div>
  );
}
