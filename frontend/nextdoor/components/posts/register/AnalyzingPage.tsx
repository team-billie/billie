import Image from "next/image";
import { ProductCondition } from "./ProductConditionModal";

interface AnalyzingPageProps {
  isAnalyzing: boolean;
  condition?: ProductCondition;
  onNext: () => void;
}

export default function AnalyzingPage({ isAnalyzing, condition, onNext }: AnalyzingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mb-4">
        <Image src="/images/smartBlueStar.png" alt="AI 분석중" width={160} height={160} priority />
      </div>
      {isAnalyzing ? (
        <>
          <div className="bg-green-100 text-green-800 rounded-full px-4 py-2 mb-4 font-semibold">기다려주셔서 감사합니다</div>
          <div className="text-xl font-bold mb-2">AI가 이미지를 분석하고 있어요</div>
          <div className="text-gray-600 mb-4">조금만 기다려주시면 곧 결과를 보여드릴게요!</div>
          <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-blue-400 animate-pulse" style={{ width: "60%" }} />
          </div>
          <div className="text-xs text-gray-400">분석이 완료될 때까지 창을 닫지 말아주세요.</div>
        </>
      ) : (
        <>
          <div className="text-lg font-semibold mb-2">AI가 분석한 상품의 상태에요</div>
          <div className="text-2xl font-bold text-blue-600 mb-4">{condition}</div>
          <div className="text-gray-700 mb-6">이 상태가 맞나요? 맞다면 다음을 눌러주세요.</div>
          <button
            className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold text-lg shadow"
            onClick={onNext}
          >
            다음
          </button>
        </>
      )}
    </div>
  );
} 