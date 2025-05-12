"use client";

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

  const year = date.getFullYear();
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

// ================ 채팅 관련 날짜/시간 포맷팅 함수 ================

/**
 * 채팅 날짜 구분선에 사용할 포맷
 * 오늘, 어제, 또는 "YYYY년 MM월 DD일" 형식으로 반환
 */
export function formatChatDate(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  if (targetDate.getTime() === today.getTime()) {
    return '오늘';
  }

  if (targetDate.getTime() === yesterday.getTime()) {
    return '어제';
  }

  return formatKoreanDate(date);
}

/**
 * 채팅 목록에 표시할 날짜 포맷
 * 오늘이면 시간만, 올해면 "MM/DD", 그 외에는 "YYYY/MM/DD" 형식으로 반환
 */
export function formatChatListDate(date: Date): string {
  const now = new Date();
  
  // 오늘인 경우
  if (isSameDate(date, now)) {
    return formatTime(date);
  }
  
  // 올해인 경우
  if (date.getFullYear() === now.getFullYear()) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  }
  
  // 그 외의 경우
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}

/**
 * 두 날짜가 같은 주에 속하는지 확인
 */
export function isSameWeek(date1: Date, date2: Date): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  // 주의 시작은 일요일로 설정
  const diff = d1.getDate() - d1.getDay();
  const startOfWeek1 = new Date(d1.setDate(diff));
  startOfWeek1.setHours(0, 0, 0, 0);
  
  const diff2 = d2.getDate() - d2.getDay();
  const startOfWeek2 = new Date(d2.setDate(diff2));
  startOfWeek2.setHours(0, 0, 0, 0);
  
  return startOfWeek1.getTime() === startOfWeek2.getTime();
}