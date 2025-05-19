import { useEffect, useState } from "react";
import ResultItem from "./ResultItem";
import useAnalysisStore from "@/lib/store/useAiAnalysisStore";
import { DamageAnalysis } from "@/types/ai-analysis/response";
import { AiBeforePhotosPostRequest } from "@/lib/api/ai-analysis/request";
import { useParams } from "next/navigation";
import AILoading from "../AILoading";

export default function BeforeAnalysis() {
  const [damageAnalysis, setDamageAnalysis] = useState<DamageAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

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
      {isLoading && <AILoading />}
      {!isLoading && (
        <div className="flex flex-col gap-2">
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : damageAnalysis && damageAnalysis.length > 0 ? (
            <>
              <div className="font-bold text-2xl text-purple mb-5">
                <div>AI 분석결과</div>
                <div>다음과 같은 손상이 발견됐어요!</div>
              </div>
              
          
              {damageAnalysis.map((item) =>
                item.damages.map((damage, damageIndex) => (
                  <ResultItem
                    key={`${item.imageIndex}-${damageIndex}`}
                    damage={damage}
                  />
                ))
              )}
            </>
          ) : (
            <div className="font-bold text-2xl">
              <div className="bg-gray700 w-1"></div>
              <div className="text-lg px-4 py-3 w-full bg-transparentWhite10 text-white break-words">
                손상 결과 없음
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
