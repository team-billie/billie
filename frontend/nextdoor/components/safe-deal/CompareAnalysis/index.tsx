import { DamageAnalysisItem } from "@/types/ai-analysis/response";
import DamageLocation from "../common/DamageLocation";
import ReportTitle from "../ReportTitle";
import ColorBox from "./ColorBox";
import DetailReport from "./DetailReport";
import { useEffect, useMemo, useState } from "react";
import { AiAnalysisGetRequest } from "@/lib/api/ai-analysis/request";
import { useParams } from "next/navigation";
import AllPhotos from "./AllPhotos";

export default function CompareAnalysis() {
  const { id } = useParams();
  const [afterPhotos, setAfterPhotos] = useState<string[] | null>(null);
  const [beforePhotos, setBeforePhotos] = useState<string[] | null>(null);
  // 분석 결과
  const [analysis, setAnalysis] = useState<DamageAnalysisItem[] | null>(null);

  const fetchAiAnalysis = async () => {
    const res = await AiAnalysisGetRequest(Number(id));
    if (res) {
      setAfterPhotos(res.afterImages);
      setBeforePhotos(res.beforeImages);
      // JSON 문자열로 온 analysis를 객체로 파싱
      const parsedAnalysis: DamageAnalysisItem[] = JSON.parse(res.analysis);
      setAnalysis(parsedAnalysis);
    }
  };

  // 각 damageType 개수를 계산하는 함수
  const countDamageTypes = (analysis: DamageAnalysisItem[]) => {
    const counts: Record<string, number> = {};
    analysis.forEach((item) => {
      item.damages.forEach((damage) => {
        const type = damage.damageType;
        counts[type] = (counts[type] || 0) + 1;
      });
    });
    return counts;
  };

  const damageCounts = useMemo(() => {
    if (!analysis) return {};
    return countDamageTypes(analysis);
  }, [analysis]);

  useEffect(() => {
    fetchAiAnalysis();
  }, [id]);

  return (
    <div className="h-screen flex flex-col">
      <div>
        <ReportTitle />
      </div>
      {/* 박스들 */}
      <div className="px-5 flex justify-between gap-2">
        <ColorBox txt="찌그러짐" num={damageCounts["DENT"] || 0} />
        <ColorBox txt="스크래치" num={damageCounts["SCRATCH"] || 0} />
        <ColorBox txt="오염" num={damageCounts["CONTAMINATION"] || 0} />
        <ColorBox txt="기타" num={damageCounts["OTHER"] || 0} />
      </div>
      {/* 요약 */}
      <div></div>
      {/* 손상 감지 위치 */}
      <div>{analysis && <DamageLocation damageAnalysis={analysis} />}</div>
      {/* 상세 결과 보고서  */}
      <div>{analysis && <DetailReport damageAnalysis={analysis} />}</div>

      {/* 전체 사진 확인 */}
      <div>
        <AllPhotos afterPhotos={afterPhotos} beforePhotos={beforePhotos} />
      </div>
      <div></div>
    </div>
  );
}
