import { useEffect, useState } from "react";
import ResultItem from "./ResultItem";
import { DamageAnalysis } from "@/types/ai-analysis/response";
import { AiBeforePhotosPostRequest } from "@/lib/api/ai-analysis/request";
import { useParams, useRouter } from "next/navigation";
import AILoading from "../AILoading";
import { motion } from "framer-motion";
import { useAlertStore } from "@/lib/store/useAlertStore";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function BeforeAnalysis() {
  const [damageAnalysis, setDamageAnalysis] = useState<DamageAnalysis | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const { showAlert } = useAlertStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await AiBeforePhotosPostRequest(Number(id));
        if (res?.damageAnalysisResult) {
          try {
            const parsedData = JSON.parse(res.damageAnalysisResult);
            setDamageAnalysis(parsedData);
          } catch (parseError) {
            console.error("Error parsing damage analysis:", parseError);
          }
        }
      } catch (err) {
        setError("분석 결과를 불러오는 중 오류가 발생했습니다.");
        showAlert("데이터를 불러오는 중 오류가 발생했습니다.", "error");
        console.error("Error fetching damage analysis:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="relative flex flex-col p-5">
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <AILoading status="before" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center mt-4">
          {error && <ErrorMessage message={error} />}
        </div>
      ) : damageAnalysis && damageAnalysis.length > 0 ? (
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
          <div className="space-y-4 mb-6">
            {damageAnalysis.flatMap((item) =>
              item.damages.map((damage, damageIndex) => (
                <ResultItem
                  key={`${item.imageIndex}-${damageIndex}`}
                  damage={damage}
                />
              ))
            )}
          </div>

          {/* Action buttons within the content area */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-xl py-3 text-semibold font-lg text-gray-700 transition-colors duration-200 text-sm"
            >
              분석 재시도
            </button>
            <button
              onClick={() =>
                router.push(`/safe-deal/${id}/before/photos-register`)
              }
              className="flex-1 bg-blue200 hover:bg-blue300 rounded-xl  text-semibold font-lg text-white transition-colors duration-200 text-sm"
            >
              사진 재등록
            </button>
          </div>
        </>
      ) : (
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
            <div className="flex gap-3 max-w-md mx-auto ">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl py-4 text-gray-700 transition-colors duration-200"
              >
                분석 재시도
              </button>
              <button
                onClick={() =>
                  router.push(`/safe-deal/${id}/before/photos-register`)
                }
                className="flex-1 bg-blue200 font-semibold hover:bg-blue300 rounded-xl py-4 text-white transition-colors duration-200"
              >
                사진 재등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
