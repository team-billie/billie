"use client";

import React from "react";

interface CalendarDayProps {
  day: number;
  year: number;
  month: number;
  isToday: boolean;
  isInRange: boolean;
  isStart: boolean;
  isEnd: boolean;
  isPastDate: boolean;
  isSunday?: boolean;
  onSelect: (year: number, month: number, day: number) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  year,
  month,
  isToday,
  isInRange,
  isStart,
  isEnd,
  isPastDate,
  isSunday = false,
  onSelect,
}) => {
  // Build class names based on states
  let classNames =
    "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ";

  if (isPastDate) {
    classNames += "opacity-50 cursor-not-allowed ";
  } else {
    classNames += "cursor-pointer hover:bg-blue-100 ";
  }

  if (isStart || isEnd) {
    classNames += "bg-blue-500 text-white ";
  } else if (isInRange) {
    classNames += "bg-blue-100 ";
  }

  if (isToday) {
    classNames += "border border-blue-500 font-bold ";
  }

  // Add text color for Sundays (red)
  if (isSunday && !isStart && !isEnd) {
    classNames += "text-red-500 ";
  }

  return (
    <div
      className={classNames}
      onClick={() => !isPastDate && onSelect(year, month, day)}
    >
      {day}
    </div>
  );
};

export default CalendarDay;
