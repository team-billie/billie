import { MatchingResult } from "@/types/ai-analysis/response";
import DetailItem from "./DetailItem";
import DetailPhoto from "./DetailPhoto";

interface DamageReportProps {
  matchingResults: MatchingResult[];
}
export default function DetailReport({ matchingResults }: DamageReportProps) {
  return (
    <div className="flex flex-col  gap-2 p-5">
      {matchingResults && matchingResults.length > 0 ? (
        <>
          <div className="mb-2">
            <div className="font-bold text-2xl text-white mb-2 ">
              상세 결과 보고서
            </div>
            <div className=" text-gray500 ">
              다음과 같은 손상이 AI에 감지되었습니다.
            </div>
          </div>
          {matchingResults.map((item, idx) => (
            item.pairComparisonResult.result === "DAMAGE_FOUND" && (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2">
                  <DetailItem
                  sequence={idx+1}
                    damage={item.pairComparisonResult.damages}
                  />
                </div>
                <div className="flex gap-2 my-2">
                  <DetailPhoto 
                    imageUrl={item.beforeImage} 
                    idx={1}
                    boundingBox={item.pairComparisonResult.damages[0]?.boundingBox}
                  />
                  <DetailPhoto 
                    imageUrl={item.afterImage} 
                    idx={2}
                    boundingBox={item.pairComparisonResult.damages[0]?.boundingBox}
                  />
                </div>
                <div className="w-full bg-gray800 h-0.5 my-3"></div>
              </div>
            )
          ))}
        </>
      ) : (
        <div>분석된 데이터가 없습니다.</div>
      )}
    </div>
  );
}
