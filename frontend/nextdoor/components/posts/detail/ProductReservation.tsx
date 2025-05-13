"use client";

import { useEffect, useRef, useState } from "react";
import CalendarModal from "./Calender/CalenderModal";
import { createReservation } from "@/lib/api/reservations/request";
import useUserStore from "@/lib/store/useUserStore";
import useAlertModal from "@/lib/hooks/alert/useAlertModal";
import { formatKoreanDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { formatNumberWithCommas } from "@/lib/utils/money";

interface ProductReservationProps {
  feedId: number;
  rentalFee: number;
  deposit: number;
}

export default function ProductReservation({
  feedId,
  rentalFee,
  deposit,
}: ProductReservationProps) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { userId } = useUserStore();
  const { showAlert } = useAlertModal();
  const router = useRouter();
  console.log("❤️❤️❤️", userId);

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

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (year: number, month: number, day: number) => {
    const selectedDate = new Date(year, month, day);

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(selectedDate);
      setEndDate(null);
      setSelectedDates([selectedDate]);
    } else {
      if (selectedDate < startDate) {
        setEndDate(startDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }

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

  const handleConfirmReservation = async () => {
    if (!startDate || !endDate) {
      alert("시작일과 종료일을 선택해주세요.");
      return;
    }

    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const reservation = {
      postId: feedId,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    try {
      const result = await createReservation(reservation, userId);
      console.log("예약 성공:", result);
      showAlert(
        "옆집 물건 예약",
        `${formatKoreanDate(startDate)}부터 ${formatKoreanDate(
          endDate
        )}까지 예약이 완료되었습니다.`,
        "success"
      );

      setShowCalendar(false);
      router.push("/reservations");
    } catch (e) {
      console.log("예약 실패", e);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full  flex justify-between p-3 bg-white">
        <div>
          <div>
            <span className="text-xl">
              ₩ {formatNumberWithCommas(rentalFee)}
            </span>
            <span> / 일 </span>
          </div>
          <div>
            <span>보증금</span>
            <span className="text-xl">
              {" "}
              ₩ {formatNumberWithCommas(deposit)}
            </span>
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
          rentalFee={rentalFee}
          deposit={deposit}
        />
      )}
    </div>
  );
}
