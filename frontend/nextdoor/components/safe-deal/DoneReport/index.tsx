import {
  DamageAnalysisItem,
  MatchingResult,
  Damage,
  BoundingBox,
} from "@/types/ai-analysis/response";
import DamageLocation from "../common/DamageLocation";
import ReportTitle from "../ReportTitle";
import { useEffect, useMemo, useState, useCallback } from "react";
import { AiAnalysisGetRequest } from "@/lib/api/ai-analysis/request";
import { useParams } from "next/navigation";
import ColorBox from "../CompareAnalysis/ColorBox";
import DetailReport from "../CompareAnalysis/DetailReport";
import AllPhotos from "../CompareAnalysis/AllPhotos";

export default function DoneReport() {
  const { id } = useParams();
  const [afterPhotos, setAfterPhotos] = useState<string[] | null>(null);
  const [beforePhotos, setBeforePhotos] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<DamageAnalysisItem[] | null>(null);
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [overallComparisonResult, setOverallComparisonResult] = useState<
    string | null
  >(null);
  const [matchingResults, setMatchingResults] = useState<
    MatchingResult[] | null
  >(null);
  const fetchAiAnalysis = useCallback(async () => {
    if (!id) return;

    try {
      // const res = await AiAnalysisGetRequest(Number(id));
      const res = {
        beforeImages: [
          "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%EC%A0%84_1.jpg",
          "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%EC%A0%84_2.jpg",
          "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%EC%A0%84_3.jpg",
          "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%EC%A0%84_4.jpg",
        ],
        afterImages: [
          "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%ED%9B%84_1.jpg",
          "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%ED%9B%84_2.jpg",
          "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%ED%9B%84_3.jpg",
        ],
        overallComparisonResult:
          "신발 한 쌍의 흰색 고무 부분(앞코, 옆면)과 신발끈 전체에 걸쳐 이전에는 없던 광범위한 오염 및 마모 흔적이 새로 발견되었습니다.",
        matchingResults: [
          {
            beforeImage:
              "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%EC%A0%84_1.jpg",
            afterImage:
              "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%ED%9B%84_2.jpg",
            pairComparisonResult: {
              result: "DAMAGE_FOUND" as const,
              damages: [
                {
                  damageType: "OTHER" as const,
                  location: "내부 투명 관 입구 위쪽 가장자리",
                  details:
                    "내부 투명 관 입구 위쪽 가장자리에서 작은 조각이 떨어져 나간 것으로 보임 (칩).",
                  boundingBox: {
                    yMin: 0.458,
                    xMax: 0.4303,
                    yMax: 0.4646,
                    xMin: 0.4246,
                  },
                  confidenceScore: 0.65,
                },
              ],
            },
          },
          {
            beforeImage:
              "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%EC%A0%84_2.jpg",
            afterImage:
              "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%ED%9B%84_3.jpg",
            pairComparisonResult: {
              result: "DAMAGE_FOUND" as const,
              damages: [
                {
                  damageType: "SCRATCH" as const,
                  location: "투명 원통 좌측 중상단",
                  details:
                    "새로운 흰색의 수평 방향 긁힘 또는 쓸림 자국이 관찰됨.",
                  boundingBox: {
                    yMin: 0.47,
                    xMax: 0.42,
                    yMax: 0.51,
                    xMin: 0.32,
                  },
                  confidenceScore: 0.85,
                },
              ],
            },
          },
          {
            beforeImage:
              "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%EC%A0%84_3.jpg",
            afterImage:
              "https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%ED%9D%AC_1_%ED%9B%84_1.jpg",
            pairComparisonResult: {
              result: "NO_DAMAGE_FOUND" as const,
              damages: [],
            },
          },
        ],
      };
      if (res) {
        setAfterPhotos(res.afterImages);
        setBeforePhotos(res.beforeImages);
        setOverallComparisonResult(res.overallComparisonResult);
        if (res.matchingResults) {
          setMatchingResults(res.matchingResults);
          // matchingResults를 DamageAnalysisItem[] 형식으로 변환
          const analysisItems: DamageAnalysisItem[] = res.matchingResults.map(
            (match, index) => ({
              imageIndex: index,
              result:
                match.pairComparisonResult.result === "DAMAGE_FOUND"
                  ? "DAMAGE_FOUND"
                  : "NO_DAMAGE",
              damages: match.pairComparisonResult.damages,
            })
          );
          setAnalysis(analysisItems);
          setHasAnalysis(true);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
      setIsLoading(false);
    }
  }, [id]);

  const countDamageTypes = useCallback((analysis: DamageAnalysisItem[]) => {
    const counts: Record<string, number> = {};
    analysis.forEach((item) => {
      item.damages.forEach((damage) => {
        const type = damage.damageType;
        counts[type] = (counts[type] || 0) + 1;
      });
    });
    return counts;
  }, []);

  const damageCounts = useMemo(() => {
    if (!analysis) return {};
    return countDamageTypes(analysis);
  }, [analysis, countDamageTypes]);

  useEffect(() => {
    if (!id) return;

    fetchAiAnalysis();

    // 분석 결과가 없을 때만 주기적으로 확인
    if (!hasAnalysis) {
      const intervalId = setInterval(fetchAiAnalysis, 5000);
      return () => clearInterval(intervalId);
    }
  }, [id, fetchAiAnalysis, hasAnalysis]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">분석 결과를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div>
        <ReportTitle />
      </div>
      {/* 박스들 */}
      <div className="px-5 flex justify-between gap-2 w-full">
        <ColorBox txt="찌그러짐" num={damageCounts["DENT"] || 0} />
        <ColorBox txt="스크래치" num={damageCounts["SCRATCH"] || 0} />
        <ColorBox txt="오염" num={damageCounts["CONTAMINATION"] || 0} />
        <ColorBox txt="기타" num={damageCounts["OTHER"] || 0} />
      </div>
      {/* 요약 */}
      {/* 손상 감지 위치 */}
      <div>{analysis && <DamageLocation damageAnalysis={analysis} />}</div>
      {/* 상세 결과 보고서  */}
      <div>
        {analysis && matchingResults && (
          <DetailReport matchingResults={matchingResults} />
          // <DetailReport
          //   key={index}
          //   afterImage={match.afterImage}
          //   beforeImage={match.beforeImage}
          //   pairComparisonResult={match.pairComparisonResult}
          // />
        )}
      </div>

      {/* 전체 사진 확인 */}
      <div>
        <AllPhotos afterPhotos={afterPhotos} beforePhotos={beforePhotos} />
      </div>
      <div></div>
    </div>
  );
}
