"use client";

import ProgressBar from "./ProgressBar";
import ResultPhoto from "./ResultPhoto";

export default function ResultSummary() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* BEFORE / AFTER 표시 */}
      <div className="flex justify-between items-center py-2 gap-6 mb-3">
        <ResultPhoto status="BEFORE" />
        <ResultPhoto status="AFTER" />
      </div>

      {/* 결과 카드 */}
      <div className="flex-1 bg-gray100 rounded-xl p-6 flex flex-col gap-6 shadow-sm">
        <div>
          <h2 className="text-blue400 text-2xl font-semibold">분석 결과</h2>
        </div>

        <div>
          <div className="text-blue400 pb-2">
            <span className="text-5xl font-bold pr-2">95%</span>
            <span className="text-lg font-medium align-bottom">일치</span>
          </div>
          <ProgressBar percent={95} />
        </div>

        <div className="text-gray600 text-sm leading-relaxed">
          높은 일치율을 보이며, 대여 당시와 거의 유사한 수준으로 유지되었습니다.
        </div>

        <div>
          <h3 className="text-blue400 text-xl font-semibold pb-1">
            손상 감지 위치
          </h3>
          <p className="text-gray600 text-sm">상판 오른쪽 상단 모서리</p>
        </div>
      </div>
    </div>
  );
}
