import { useEffect, useState, useCallback } from "react";
import ResultItem from "./ResultItem";
import { DamageAnalysisItem } from "@/types/ai-analysis/response";
import { AiAnalysisGetRequest } from "@/lib/api/ai-analysis/request";
import { useParams, useRouter } from "next/navigation";
import AILoading from "../AILoading";
import { motion } from "framer-motion";
import { useAlertStore } from "@/lib/store/useAlertStore";
import ErrorMessage from "@/components/common/ErrorMessage";
import PhotoBox from "../CompareAnalysis/AllPhotos/PhotoBox";

export default function BeforeAnalysis() {
  const { id } = useParams();
  const [beforePhotos, setBeforePhotos] = useState<string[] | null>(null);
  const [damageAnalysisItems, setDamageAnalysisItems] = useState<
    DamageAnalysisItem[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { showAlert } = useAlertStore();

  // useCallback을 사용하여 함수를 메모이제이션
  const fetchAiAnalysis = useCallback(async () => {
    try {
      if (isLoading) {
        setError(null);
      }
      const res = await AiAnalysisGetRequest(Number(id));

      if (res) {
        // API 응답에서 beforeImages 배열 설정
        setBeforePhotos(res.beforeImages);

        // 유효한 분석 결과가 있는지 확인
        if (res.analysisResult && res.analysisResult.length > 0) {
          try {
            const parsedAnalysisResult = JSON.parse(res.analysisResult);
            setDamageAnalysisItems(parsedAnalysisResult);

            // 분석 결과가 있으면 hasAnalysis를 true로 설정
            setHasAnalysis(true);
            setIsLoading(false);
          } catch (parseErr) {
            console.error("Error parsing analysis result:", parseErr);
            setError("분석 결과를 처리하는 중 오류가 발생했습니다.");
            setIsLoading(false);
          }
        } else {
          // 분석 결과가 없으면 null로 설정하고 로딩 상태는 유지
          // 여기서 변경: isLoading을 false로 설정하지 않음
          setDamageAnalysisItems(null);
          // API는 응답했지만 분석이 진행 중일 때는 hasAnalysis는 여전히 false
        }
      }
    } catch (err) {
      showAlert("데이터를 불러오는 중 오류가 발생했습니다.", "error");
      console.error("Error fetching damage analysis:", err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  }, [id, showAlert, isLoading]); // isLoading 의존성 추가

  useEffect(() => {
    if (!id) return;

    // 초기 요청
    fetchAiAnalysis();

    // 분석 결과가 없을 때만 주기적으로 확인 (5초마다)
    const intervalId = setInterval(() => {
      if (!hasAnalysis) {
        fetchAiAnalysis();
      } else {
        // 이미 분석 결과가 있으면 인터벌 정지
        clearInterval(intervalId);
      }
    }, 5000); // 5초마다 확인

    return () => clearInterval(intervalId);
  }, [id, fetchAiAnalysis, hasAnalysis]);

  // 손상이 발견되었는지 확인하는 함수
  const hasDamageFound = () => {
    if (!damageAnalysisItems || damageAnalysisItems.length === 0) return false;

    // 배열 내 하나라도 DAMAGE_FOUND가 있으면 손상 있음
    return damageAnalysisItems.some((item) => item.result === "DAMAGE_FOUND");
  };

  return (
    <div className="relative flex flex-col p-5">
      {isLoading || !hasAnalysis ? (
        // isLoading 또는 분석이 아직 완료되지 않은 경우 로딩 UI 표시
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <AILoading status="before" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center mt-4">
          {error && <ErrorMessage message={error} />}
        </div>
      ) : damageAnalysisItems && hasDamageFound() ? (
        <>
          {/* Header for damage found */}
          <div className="mb-6">
            <div className="text-3xl font-bold text-blue200 mb-1">
              AI 분석결과
            </div>
            <div className="text-lg font-medium text-gray100">
              다음과 같은 손상이 발견됐어요!
            </div>
          </div>

          {/* Damage Results */}
          {beforePhotos && <PhotoBox images={beforePhotos} status={null} />}
          <div className="space-y-4 mb-6">
            {damageAnalysisItems.map(
              (item, itemIndex) =>
                item.result === "DAMAGE_FOUND" &&
                item.damages.map((damage, damageIndex) => (
                  <ResultItem
                    key={`${item.imageIndex}-${damageIndex}`}
                    damage={damage}
                  />
                ))
            )}
          </div>
        </>
      ) : (
        // 분석이 완료되고 손상이 없는 경우에만 표시
        <div className="relative">
          <div className="text-center mt-24 mb-4 ">
            <div className="text-3xl font-bold text-white  mb-1">
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
            손상이 발견되지 않았습니다
          </div>
          {/* Action buttons fixed at bottom */}
          <div className="fixed bottom-24 left-0 right-0 px-4  z-40">
            <div className="flex gap-3 max-w-md mx-auto "></div>
          </div>
        </div>
      )}
    </div>
  );
}
