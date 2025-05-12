export function formatNumberWithCommas(value: number | string): string {
  if (typeof value === "number") {
    return value.toLocaleString("ko-KR");
  }

  // 문자열일 경우 숫자 형태로 변환 후 처리
  const num = Number(value);
  if (isNaN(num)) return value; // 숫자가 아닌 경우 원본 반환
  return num.toLocaleString("ko-KR");
}
