"use client";

import { useParams } from "next/navigation";
import ResultPhoto from "./ResultPhoto";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api/instance";
import blueStar2 from "@/public/images/blueStar2.png";
import Image from "next/image";
import { cleanAnalysisText } from "@/lib/utils/analysis";
interface ApiResponse {
  beforeImages: string[];
  afterImages: string[];
  analysis: string | null;
}

export default function ResultSummary() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [formattedAnalysis, setFormattedAnalysis] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/v1/rentals/${id}/ai-analysis`
        );
        setData(response.data);

        // 분석 텍스트 정리
        if (response.data.analysis) {
          const cleanedText = cleanAnalysisText(response.data.analysis);
          setFormattedAnalysis(cleanedText);
        }
      } catch (err) {
        console.error("Error fetching analysis data:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">분석 결과를 불러오는 중...</p>
      </div>
    );
  }

  // 오류가 있거나 데이터가 없을 때 표시할 컴포넌트
  if (error || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">
          {error || "데이터를 불러올 수 없습니다."}
        </p>
      </div>
    );
  }

  // 여기서부터는 data가 null이 아니라고 확정됨

  // 첫 번째 이미지 가져오기 (없으면 undefined)
  const beforeImageUrl =
    data.beforeImages && data.beforeImages.length > 0
      ? data.beforeImages[0]
      : undefined;

  const afterImageUrl =
    data.afterImages && data.afterImages.length > 0
      ? data.afterImages[0]
      : undefined;

  // 분석 결과 데이터 (없으면 기본값 사용)
  const summary = data.analysis ?? "분석 결과가 없습니다.";

  return (
    <div className="w-full h-full flex flex-col">
      {/* BEFORE / AFTER 표시 */}
      <div className="flex justify-between items-center py-2 gap-6 mb-3">
        <ResultPhoto status="BEFORE" imageUrl={beforeImageUrl} />
        <ResultPhoto status="AFTER" imageUrl={afterImageUrl} />
      </div>

      {/* 결과 카드 */}
      <div className="flex-1 bg-gray200 rounded-xl p-6 flex flex-col gap-6 shadow-sm relative">
        <div>
          <h2 className="text-blue400 text-2xl font-semibold">분석 결과</h2>
        </div>

        <div>
          <h3 className="text-gray800 text-xl font-semibold pb-2">
            손상 감지 결과
          </h3>
          {/* 분석 결과 표시 */}
          {formattedAnalysis ? (
            <div className="text-gray600 text-m leading-relaxed whitespace-pre-line">
              {formattedAnalysis}
            </div>
          ) : (
            <div className="text-gray600 text-sm leading-relaxed">
              감지된 손상이 없습니다.
            </div>
          )}
        </div>
        <div
          className="absolute bottom-0 right-0"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: "208px",
            maxHeight: "208px",
          }}
        >
          <Image src={blueStar2} alt="blueStar" fill />
        </div>
      </div>
    </div>
  );
}
