export type BoundingBox = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
};

export type Damage = {
  damageType: "CONTAMINATION" | "SCRATCH" | "OTHER";
  location: string;
  details: string;
  boundingBox: BoundingBox;
  confidenceScore: number;
};

export type DamageAnalysisItem = {
  imageIndex: number;
  result: "DAMAGE_FOUND" | "NO_DAMAGE";
  damages: Damage[];
};

export type AiAnalysisGetRequestDTO = {
  beforeImages: string[];
  afterImages: string[];
  analysis: string;
};

export type DamageAnalysis = DamageAnalysisItem[];

export interface AnalysisState {
  damageAnalysis: DamageAnalysis | null;
  setDamageAnalysis: (data: string) => void; // string 형태(서버에서 오는 JSON 문자열)을 받아서 파싱해서 저장
}
