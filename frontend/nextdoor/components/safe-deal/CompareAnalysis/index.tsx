import {
  DamageAnalysisItem,
  MatchingResult,
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
import { motion } from "framer-motion";

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
  // 결과가 없는 경우를 표시하는 상태
  const [notFound, setNotFound] = useState(false);
  // 분석 상태를 나타내는 상태 ('analyzing', 'not_found', 'found_damage')
  const [analysisStatus, setAnalysisStatus] = useState<string>("analyzing");
  const [matchingResults, setMatchingResults] = useState<
    MatchingResult[] | null
  >(null);

  const fetchAiAnalysis = useCallback(async () => {
    if (!id) return;

    try {
      const res = await AiAnalysisGetRequest(Number(id));
      if (res) {
        // 기본 데이터 설정
        setAfterPhotos(res.afterImages);
        setBeforePhotos(res.beforeImages);
        setOverallComparisonResult(res.overallComparisonResult);

        // 분석 상태 처리
        if (res.overallComparisonResult === null) {
          // 아직 분석 중인 경우
          setAnalysisStatus("analyzing");
          setHasAnalysis(false);
          setIsLoading(true);
          setNotFound(false);
        } else if (res.overallComparisonResult === "") {
          // 분석은 완료되었으나 매칭 결과가 없는 경우
          setAnalysisStatus("not_found");
          setHasAnalysis(true);
          setIsLoading(false);
          setNotFound(true);
        } else {
          // 정상적으로 분석이 완료되고 결과가 있는 경우
          setAnalysisStatus("found_damage");
          setHasAnalysis(true);
          setIsLoading(false);
          setNotFound(false);
        }

        // 분석이 완료된 경우 (빈 문자열 포함)
        if (res.overallComparisonResult !== null) {
          // matchingResults가 존재하고 배열인 경우에만 분석 아이템 생성
          if (
            res.matchingResults &&
            Array.isArray(res.matchingResults) &&
            res.matchingResults.length > 0
          ) {
            setMatchingResults(res.matchingResults);

            const analysisItems: DamageAnalysisItem[] = res.matchingResults.map(
              (match, index) => ({
                imageIndex: index,
                result:
                  match.pairComparisonResult.result === "DAMAGE_FOUND"
                    ? "DAMAGE_FOUND"
                    : "NO_DAMAGE_FOUND",
                damages: match.pairComparisonResult.damages || [],
              })
            );
            setAnalysis(analysisItems);
          } else {
            // 매칭 결과가 없는 경우
            setMatchingResults([]);
            setAnalysis([]);
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
    if (!analysis || !Array.isArray(analysis)) return counts;

    analysis.forEach((item) => {
      if (item.damages && Array.isArray(item.damages)) {
        item.damages.forEach((damage) => {
          const type = damage.damageType;
          counts[type] = (counts[type] || 0) + 1;
        });
      }
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
      } else {
        // 분석이 완료되면 interval 정리
        clearInterval(intervalId);
      }
    }, 5000); // 5초마다 확인

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
    <div className="relative flex flex-col">
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <AILoading status="after" />
        </div>
      ) : (
        <>
          <div>
            <ReportTitle />
          </div>

          {/* 매칭 결과가 없는 경우 */}
          {notFound && (
            <div className="relative">
              <div className="text-center m-16 mb-4 ">
                <div className="text-2xl font-bold text-white  mb-1">
                  AI 분석결과
                </div>
              </div>

              <div className="flex justify-center my-8">
                <motion.div
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="none"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="#22c55e"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
              <div className="text-lg font-medium text-white text-center">
                <div>추가적인 손상이</div>
                <div>발견되지 않았습니다</div>
              </div>
              {/* Action buttons fixed at bottom */}
              <div className="fixed bottom-24 left-0 right-0 px-4  z-40">
                <div className="flex gap-3 max-w-md mx-auto "></div>
              </div>
            </div>
          )}

          {/* 분석 결과가 있는 경우에만 박스들 표시 */}
          {!notFound && (
            <div className="px-5 flex justify-between gap-2 w-full">
              <ColorBox txt="찌그러짐" num={damageCounts["DENT"] || 0} />
              <ColorBox txt="스크래치" num={damageCounts["SCRATCH"] || 0} />
              <ColorBox txt="오염" num={damageCounts["CONTAMINATION"] || 0} />
              <ColorBox txt="기타" num={damageCounts["OTHER"] || 0} />
            </div>
          )}

          {/* 손상 감지 위치 - 분석 결과가 있는 경우에만 */}
          {!notFound && analysis && analysis.length > 0 && (
            <div>
              <DamageLocation damageAnalysis={analysis} />
            </div>
          )}

          {/* 상세 결과 보고서 - 분석 결과가 있는 경우에만 */}
          {!notFound &&
            analysis &&
            matchingResults &&
            matchingResults.length > 0 && (
              <div>
                <DetailReport matchingResults={matchingResults} />
              </div>
            )}

          {/* 전체 사진 확인 - 항상 표시 */}
          <div className="relative w-full mt-4">
            <AllPhotos afterPhotos={afterPhotos} beforePhotos={beforePhotos} />
          </div>
        </>
      )}
    </div>
  );
}
