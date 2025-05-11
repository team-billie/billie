"use client";

/**
 * 날짜를 "YYYY.MM.DD" 형식으로 변환
 * 예: 2025-05-02 → "2025.05.02"
 */
export function formatDate(dateInput: string | Date | null): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // 0-indexed
  const day = padZero(date.getDate());

  return `${year}.${month}.${day}`;
}

/**
 * 날짜를 "M월 D일 (요일)" 형식으로 반환
 * 예: 2025-05-02 → "5월 2일 (금)"
 */
export function formatDateWithDay(dateInput: string | Date | null): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = getKoreanDay(date.getDay());

  return `${month}월 ${day}일 (${weekday})`;
}

/**
 * 날짜를 "YYYY년 MM월 DD일" 형식으로 변환
 * 예: 2025-05-02 → "2025년 5월 2일"
 */
export function formatKoreanDate(dateInput: string | Date | null): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const year = date.getFullYear() % 100;
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 시작일과 종료일을 "YYYY년 MM월 DD일부터 YYYY년 MM월 DD일까지" 형식으로 반환
 */
export function formatDateRange(
  startDate: Date | null,
  endDate: Date | null
): string {
  if (!startDate) return "";
  if (!endDate) return `${formatKoreanDate(startDate)}부터`;

  return `${formatKoreanDate(startDate)}부터 ${formatKoreanDate(endDate)}까지`;
}

/**
 * 두 날짜가 같은지 비교 (년, 월, 일)
 */
export function isSameDate(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * 두 날짜 사이의 모든 날짜를 포함하는 배열 반환 (시작일, 종료일 포함)
 */
export function generateDateRange(startDate: Date, endDate: Date): Date[] {
  if (!startDate || !endDate) return [];

  const dateRange: Date[] = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  // 시작일이 종료일보다 나중인 경우 처리
  if (currentDate > lastDate) {
    return generateDateRange(endDate, startDate);
  }

  while (currentDate <= lastDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
}

/**
 * 날짜가 오늘 이전인지 확인
 */
export function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * 해당 월의 첫 번째 날의 요일 반환 (0: 일요일, 1: 월요일, ...)
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * 해당 월의 일수 반환
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 다음 월 정보 반환 (연도 전환 처리)
 */
export function getNextMonth(
  year: number,
  month: number
): { year: number; month: number } {
  if (month === 11) {
    return { year: year + 1, month: 0 };
  } else {
    return { year, month: month + 1 };
  }
}

/**
 * 한 자리 숫자 앞에 0 붙이기 (2 → 02)
 */
function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * 요일 인덱스를 한글 요일로 변환
 */
function getKoreanDay(index: number): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[index];
}

/**
 * 시간을 "오전/오후 HH:MM" 형식으로 반환
 * 예: 2025-05-02T14:30 → "오후 2:30"
 */
export function formatTime(dateInput: string | Date | null): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  const isAM = hours < 12;
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${isAM ? "오전" : "오후"} ${hour12}:${minutes}`;
}
