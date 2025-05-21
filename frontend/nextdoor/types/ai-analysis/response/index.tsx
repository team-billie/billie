export type BoundingBox = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
};

export type Damage = {
  damageType: "DENT" | "SCRATCH" | "CONTAMINATION" | "ETC";
  location: string;
  details: string;
  boundingBox: BoundingBox;
  confidenceScore: number;
};

export type DamageAnalysisItem = {
  imageIndex: number;
  result: "DAMAGE_FOUND" | "NO_DAMAGE_FOUND";
  damages: Damage[];
};

export type DamageAnalysis = DamageAnalysisItem[];

export type AnalysisState = {
  damageAnalysis: DamageAnalysis;
  setDamageAnalysis: (dataString: string) => void;
};

export type PairComparisonResult = {
  result: "DAMAGE_FOUND" | "NO_DAMAGE_FOUND";
  damages: Damage[];
};

export type MatchingResult = {
  beforeImage: string;
  afterImage: string;
  pairComparisonResult: PairComparisonResult;
};

export type AiAnalysisResponse = {
  beforeImages: string[];
  afterImages: string[];
  overallComparisonResult: string | null;
  matchingResults: MatchingResult[];
  analysisResult: string;
};

export type AiAnalysisGetRequestDTO = {
  beforeImages: string[];
  afterImages: string[];
  overallComparisonResult: string | null;
  matchingResults: MatchingResult[];
  analysisResult: string;
};
