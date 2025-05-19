import { useEffect, useState } from "react";
import ResultItem from "./ResultItem";
import { DamageAnalysis } from "@/types/ai-analysis/response";
import { AiBeforePhotosPostRequest } from "@/lib/api/ai-analysis/request";
import { useParams, useRouter } from "next/navigation";
import AILoading from "../AILoading";
import { motion } from "framer-motion";

export default function BeforeAnalysis() {
  const [damageAnalysis, setDamageAnalysis] = useState<DamageAnalysis | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();

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
            setError("데이터 파싱 중 오류가 발생했습니다.");
          }
        }
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
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
        <AILoading />
      ) : error ? (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-red-100">
            <div className="text-red-500 font-medium text-center">{error}</div>
            <div className="mt-4 text-sm text-gray-500 text-center">
              잠시 후 다시 시도해주세요
            </div>
          </div>
        </div>
      ) : damageAnalysis && damageAnalysis.length > 0 ? (
        <>
          {/* Header for damage found */}
          <div className="mb-6">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              AI 분석결과
            </div>
            <div className="text-lg font-medium text-gray-700">
              다음과 같은 손상이 발견됐어요!
            </div>
          </div>

          {/* Damage Results */}
          <div className="space-y-4 mb-6">
            {damageAnalysis.map((item) =>
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
              className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-xl py-3 font-medium text-gray-700 transition-colors duration-200 text-sm"
            >
              분석 재시도
            </button>
            <button
              onClick={() =>
                router.push(`/safe-deal/${id}/before/photos-register`)
              }
              className="flex-1 bg-purple-50 hover:bg-purple-100 rounded-xl py-3 font-medium text-purple-600 transition-colors duration-200 text-sm"
            >
              사진 재등록
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mt-20 mb-6 ">
            <div className="text-2xl font-bold text-purple  mb-1">
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
          {/* Action buttons within the content area */}
          <div className="flex gap-3 mb-6 fixed bottom-16 w-full right-0 left-0 px-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl py-4 font-medium text-gray-700 transition-colors duration-200 text-sm"
            >
              분석 재시도
            </button>
            <button
              onClick={() =>
                router.push(`/safe-deal/${id}/before/photos-register`)
              }
              className="flex-1 bg-blue200 font-semibold  hover:bg-purple-100 rounded-xl py-3 font-medium text-purple-600 transition-colors duration-200 text-sm"
            >
              사진 재등록
            </button>
          </div>
        </>
      )}
    </div>
  );
}
