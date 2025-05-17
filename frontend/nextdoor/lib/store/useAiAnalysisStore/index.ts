import { AnalysisState, DamageAnalysis } from "@/types/ai-analysis/response";
import { create } from "zustand";

const useAnalysisStore = create<AnalysisState>((set) => ({
  damageAnalysis: null,
  setDamageAnalysis: (dataString) => {
    try {
      // 빈 배열 문자열인 경우 빈 배열로 파싱
      if (dataString === "[]") {
        set({ damageAnalysis: [] });
        return;
      }

      // 문자열을 JSON으로 파싱
      const parsedData = JSON.parse(dataString) as DamageAnalysis;
      set({ damageAnalysis: parsedData });
    } catch (error) {
      console.error("damageAnalysis JSON 파싱 실패", error);
      set({ damageAnalysis: null });
    }
  },
}));

export default useAnalysisStore;
