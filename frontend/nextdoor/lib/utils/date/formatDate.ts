//사용 예시
// import { formatDate, formatDateWithDay } from '@/lib/utils/date/formatDate';
//const today = formatDate('2025-05-02');               // "2025.05.02"
//const pretty = formatDateWithDay(new Date());         // "5월 2일 (금)"

// formatDate.ts

/**
 * 날짜를 "YYYY.MM.DD" 형식으로 변환
 * 예: 2025-05-02 → "2025.05.02"
 */
export function formatDate(dateInput: string | Date): string {
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
export function formatDateWithDay(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = getKoreanDay(date.getDay());

  return `${month}월 ${day}일 (${weekday})`;
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
