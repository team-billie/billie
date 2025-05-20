import {
  DamageAnalysisItem,
  MatchingResult,
  Damage,
  BoundingBox,
} from "@/types/ai-analysis/response";
import DamageLocation from "../common/DamageLocation";
import ReportTitle from "../ReportTitle";
import ColorBox from "./ColorBox";
import DetailReport from "./DetailReport";
import { useEffect, useMemo, useState, useCallback } from "react";
import { AiAnalysisGetRequest } from "@/lib/api/ai-analysis/request";
import { useParams } from "next/navigation";
import AllPhotos from "./AllPhotos";
import AILoading from "../AILoading";

export default function CompareAnalysis() {
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
      const res = await AiAnalysisGetRequest(Number(id));
      if (res) {
        setAfterPhotos(res.afterImages);
        setBeforePhotos(res.beforeImages);
        setOverallComparisonResult(res.overallComparisonResult);

        // 분석 결과가 있는지 확인
        const hasValidAnalysis =
          res.overallComparisonResult &&
          Array.isArray(res.overallComparisonResult)
            ? res.overallComparisonResult.length > 0
            : Boolean(res.overallComparisonResult);

        if (
          res.matchingResults &&
          res.matchingResults.length > 0 &&
          hasValidAnalysis
        ) {
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
          setIsLoading(false);
        } else {
          // 분석 결과가 없거나 비어있으면 hasAnalysis를 false로 유지하여 계속 요청
          setHasAnalysis(false);
          // 데이터는 로드되었지만 분석이 완료되지 않았음을 표시
          if (!isLoading) {
            setIsLoading(true);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
      // 오류 발생 시에도 계속 재시도
      setHasAnalysis(false);
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

    // 초기 요청
    fetchAiAnalysis();

    // 분석 결과가 없을 때만 주기적으로 확인
    const intervalId = setInterval(() => {
      if (!hasAnalysis) {
        fetchAiAnalysis();
      }
    }, 50000);

    return () => clearInterval(intervalId);
  }, [id, fetchAiAnalysis, hasAnalysis]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-10rem)] overflow-auto">
        <AILoading status="after" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col ">
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <AILoading status="after" />
        </div>
      ) : (
        <>
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
            )}
          </div>

          {/* 전체 사진 확인 */}
          <div>
            <AllPhotos afterPhotos={afterPhotos} beforePhotos={beforePhotos} />
          </div>
        </>
      )}
    </div>
  );
}
