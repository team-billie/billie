// utils/analysis-utils.ts

/**
 * 마크다운 형식의 분석 텍스트를 HTML로 변환합니다.
 * 간단한 마크다운 구문을 처리합니다.
 */
export function formatAnalysisText(analysisText: string | null): string {
  if (!analysisText) return "";

  // 줄바꿈 처리
  let formattedText = analysisText.replace(/\n/g, "<br>");

  // 목록 항목(-) 처리
  formattedText = formattedText.replace(/- /g, "• ");

  // 들여쓰기 처리
  formattedText = formattedText.replace(/<br>  /g, "<br>&nbsp;&nbsp;");

  return formattedText;
}

/**
 * 마크다운 형식의 분석 텍스트를 정돈된 텍스트로 변환합니다.
 * HTML 태그를 사용하지 않습니다.
 */
export function cleanAnalysisText(analysisText: string | null): string {
  if (!analysisText) return "";

  // 손상 번호 제거 (예: "- Damage 1:" -> "손상:")
  let cleanedText = analysisText.replace(/- Damage \d+:/g, "손상:");

  // 불필요한 마크다운 구문 제거
  cleanedText = cleanedText.replace(/- Location: /g, "위치: ");
  cleanedText = cleanedText.replace(/- Details: /g, "세부사항: ");

  // 줄바꿈과 들여쓰기 조정
  cleanedText = cleanedText.replace(/\n  /g, "\n");

  return cleanedText;
}
