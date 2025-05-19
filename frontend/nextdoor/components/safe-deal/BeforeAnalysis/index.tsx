import { useEffect, useState } from "react";
import ResultItem from "./ResultItem";
import useAnalysisStore from "@/lib/store/useAiAnalysisStore";
import {
  AiAnalysisGetRequestDTO,
  DamageAnalysis,
} from "@/types/ai-analysis/response";

export default function BeforeAnalysis() {
  const damageAnalysis = useAnalysisStore<DamageAnalysis | null>(
    (state) => state.damageAnalysis
  );

  return (
    <div className="relative flex flex-col  p-5">
      <div className="flex flex-col gap-2">
        {damageAnalysis && damageAnalysis.length > 0 ? (
          <>
            <div className="font-bold text-2xl text-purple mb-5">
              <div>AI 분석결과</div>
              <div>다음과 같은 손상이 발견됐어요!</div>
            </div>
            {damageAnalysis.map((item, imageIndex) =>
              item.damages.map((damage, damageIndex) => (
                <ResultItem
                  key={`${imageIndex}-${damageIndex}`}
                  damage={damage}
                />
              ))
            )}
          </>
        ) : (
          <div className="font-bold text-2xl">
            <div className="bg-gray700 w-1 "></div>
            <div className="text-lg px-4 py-3 w-full bg-transparentWhite10 text-white break-words">
              손상 결과 없음
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
