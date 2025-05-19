import { DamageAnalysisItem } from "@/types/ai-analysis/response";
import LocationItem from "../../AfterPayment/LocationItem";

interface DamageLocationProps {
  damageAnalysis: DamageAnalysisItem[];
}
export default function DamageLocation({
  damageAnalysis,
}: DamageLocationProps) {
  console.log("❤️❤️❤️", damageAnalysis);
  return (
    <div className="flex flex-col gap-2 p-5">
      {damageAnalysis && damageAnalysis.length > 0 ? (
        <>
          <div className="mb-2">
            <div className="font-bold text-2xl text-white mb-2 ">
              손상 감지 위치
            </div>
            <div className=" text-gray500 ">
              다음과 같은 손상이 AI에 감지되었습니다.
            </div>
          </div>
          {damageAnalysis.map((item, imageIndex) =>
            item.damages.map((damage, damageIndex) => (
              <LocationItem
                key={`${imageIndex}-${damageIndex}`}
                damage={damage}
              />
            ))
          )}
        </>
      ) : (
        <div>분석된 데이터가 없습니다.</div>
      )}
    </div>
  );
}
