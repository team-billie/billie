"use client";

import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isPastDate,
  isSameDate,
} from "@/lib/utils";
import React from "react";
import CalendarDay from "./CalenderDay";

interface CalendarMonthProps {
  year: number;
  month: number;
  selectedDates: Date[];
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (year: number, month: number, day: number) => void;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  year,
  month,
  selectedDates,
  startDate,
  endDate,
  onDateSelect,
}) => {
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const today = new Date();

  // Adjust for Korean calendar (Sunday is 0)
  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  // Create weekday headers
  const weekDays = dayLabels.map((day, index) => (
    <div
      key={`weekday-${index}`}
      className={`w-10 h-10 flex items-center justify-center text-sm ${
        index === 0 ? "text-red-500" : ""
      }`}
    >
      {day}
    </div>
  ));

  // Create empty slots for days before the first day of month
  const blanks: JSX.Element[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(<div key={`blank-${i}`} className="w-10 h-10"></div>);
  }

  // Check if a date is in the selected range
  const isDateInRange = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month, day);
    return selectedDates.some((selectedDate) => isSameDate(selectedDate, date));
  };

  // Check if a date is the start date
  const isStartDate = (year: number, month: number, day: number): boolean => {
    if (!startDate) return false;
    const date = new Date(year, month, day);
    return isSameDate(startDate, date);
  };

  // Check if a date is the end date
  const isEndDate = (year: number, month: number, day: number): boolean => {
    if (!endDate) return false;
    const date = new Date(year, month, day);
    return isSameDate(endDate, date);
  };

  // Create day cells
  const days: JSX.Element[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      d === today.getDate();

    const isInRange = isDateInRange(year, month, d);
    const isStart = isStartDate(year, month, d);
    const isEnd = isEndDate(year, month, d);

    const date = new Date(year, month, d);
    const isPastDay = isPastDate(date);

    // Check if the day is Sunday (day of week = 0)
    const isSunday = new Date(year, month, d).getDay() === 0;

    days.push(
      <CalendarDay
        key={`day-${d}`}
        day={d}
        year={year}
        month={month}
        isToday={isToday}
        isInRange={isInRange}
        isStart={isStart}
        isEnd={isEnd}
        isPastDate={isPastDay}
        onSelect={onDateSelect}
        isSunday={isSunday}
      />
    );
  }

  const totalSlots = [...blanks, ...days];
  const rows: JSX.Element[][] = [];
  let cells: JSX.Element[] = [];

  totalSlots.forEach((slot, i) => {
    if (i % 7 !== 0) {
      cells.push(slot);
    } else {
      if (cells.length > 0) {
        rows.push(cells);
      }
      cells = [slot];
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-7 gap-1 mb-2">{weekDays}</div>
      {rows.map((row, i) => (
        <div key={`row-${i}`} className="grid grid-cols-7 gap-1 mb-1">
          {row}
        </div>
      ))}
    </div>
  );
};

export default CalendarMonth;
