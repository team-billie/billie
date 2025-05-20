"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Camera,
  X,
  Plus,
  Image as ImageIcon,
  Pencil,
  FileText,
  Tag,
  MapPin,
  CircleDollarSign,
} from "lucide-react";
import { createPost } from "@/lib/api/posts/request";
import useProductRegisterStore from "@/lib/store/posts/useProductRegisterStore";
import ProductRegisterHeader from "@/components/posts/register/ProductRegisterHeader";
import ProductRegisterCategorySelector from "@/components/posts/register/ProductRegisterCategorySelector";
import ProductRegisterLocationSelector from "@/components/posts/register/ProductRegisterLocationSelector";
import { ProductCondition } from "@/components/posts/register/ProductConditionModal";
import axiosInstance from "@/lib/api/instance";
import LoadingIcon from "@/components/common/LoadingIcon";
import { useAlertStore } from "@/lib/store/useAlertStore";

export default function NewPostPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const { showAlert } = useAlertStore();
  // 분석 결과 안내/다음 버튼 상태
  const [aiResult, setAiResult] = useState<{
    title: string;
    content: string;
    category: string;
    condition: ProductCondition;
    report: string;
    autoFillMessage: string;
  } | null>(null);
  const [showAiResultModal, setShowAiResultModal] = useState(false);

  const {
    title,
    content,
    rentalFee,
    deposit,
    category,
    preferredLocation,
    setTitle,
    setContent,
    setRentalFee,
    setDeposit,
    setCategory,
    setPreferredLocation,
    resetForm,
  } = useProductRegisterStore();

  const [showResultAnimation, setShowResultAnimation] = useState(false);
  const [showSmartStar, setShowSmartStar] = useState(false);

  const conditionMap: Record<string, ProductCondition> = {
    UNOPENED: "미개봉",
    ALMOST_NEW: "거의 새 제품",
    GOOD: "양호",
    NORMAL: "보통",
    USED: "사용감 있음",
    NEEDS_REPAIR: "수리 필요함",
  };

  // 폼 임시 저장/복원 키
  const FORM_DRAFT_KEY = "postFormDraft";

  // 폼 임시 저장 함수
  const saveFormDraft = () => {
    const draft = {
      title,
      content,
      category,
      rentalFee,
      deposit,
      preferredLocation,
      previewUrls,
    };
    localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(draft));
  };

  // 폼 임시 복원 함수 (마운트 시)
  useEffect(() => {
    const draftStr = localStorage.getItem(FORM_DRAFT_KEY);
    if (draftStr) {
      try {
        const draft = JSON.parse(draftStr);
        if (draft.title) setTitle(draft.title);
        if (draft.content) setContent(draft.content);
        if (draft.category) setCategory(draft.category);
        if (draft.rentalFee) setRentalFee(draft.rentalFee);
        if (draft.deposit) setDeposit(draft.deposit);
        if (draft.preferredLocation)
          setPreferredLocation(draft.preferredLocation);
        if (draft.previewUrls) setPreviewUrls(draft.previewUrls);
      } catch {}
      localStorage.removeItem(FORM_DRAFT_KEY);
    }
  }, []);

  useEffect(() => {
    if (isAnalyzing) {
      setProgress(0);
      if (progressRef.current) clearInterval(progressRef.current);
      let localProgress = 0;
      let interval: NodeJS.Timeout;
      const updateProgress = () => {
        // 0~90%까지는 랜덤하게 보통 속도로 증가
        if (localProgress < 90) {
          // 0.7~2.2% 랜덤 증가
          const increment = Math.random() * 1.5 + 0.7;
          // 120~350ms 랜덤 간격
          const delay = Math.random() * 230 + 120;
          localProgress = Math.min(localProgress + increment, 90);
          setProgress(localProgress);
          interval = setTimeout(updateProgress, delay);
        }
      };
      interval = setTimeout(updateProgress, 200);
      progressRef.current = interval as unknown as NodeJS.Timeout;
    } else {
      // 분석이 끝나면 100%로 애니메이션
      setProgress(100);
      if (progressRef.current) {
        clearTimeout(progressRef.current);
        progressRef.current = null;
      }
    }
    return () => {
      if (progressRef.current) {
        clearTimeout(progressRef.current);
        progressRef.current = null;
      }
    };
  }, [isAnalyzing]);

  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      setPreferredLocation(storedLocation);
      localStorage.removeItem("selectedLocation");
    }
  }, [setPreferredLocation]);

  // 분석 결과가 나오면 애니메이션 트리거
  useEffect(() => {
    if (showAiResultModal && aiResult) {
      setTimeout(() => {
        setShowResultAnimation(true);
        setTimeout(() => setShowSmartStar(true), 700); // 올라간 후 이미지 변경
      }, 400); // 결과 모달 뜨고 0.4초 후 애니메이션 시작
    } else {
      setShowResultAnimation(false);
      setShowSmartStar(false);
    }
  }, [showAiResultModal, aiResult]);

  const handleMainImageSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("handleMainImageSelect 시작");
    const file = e.target.files?.[0];
    if (!file) {
      console.log("파일이 선택되지 않음");
      return;
    }
    console.log("선택된 파일:", file.name);

    setSelectedImage(file);
    setPreviewUrls([URL.createObjectURL(file)]);
    console.log("이미지 분석 시작 전");
    await analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    console.log("analyzeImage 함수 시작");
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      console.log("이미지 분석 API 호출 시작");
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosInstance.post(
        "/api/v1/posts/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;
      console.log("API 응답 받음:", result);

      if (!result) {
        console.error("API 응답이 없음");
        throw new Error("API 응답이 없습니다.");
      }

      const condition = result.condition || "GOOD";
      const mappedCondition = conditionMap[condition] || "양호";
      console.log("상태 매핑:", {
        original: condition,
        mapped: mappedCondition,
      });

      const newAiResult = {
        title: result.title || "",
        content: result.content || "",
        category: result.category || "",
        condition: mappedCondition,
        report: result.report || "",
        autoFillMessage: result.autoFillMessage || "",
      };
      setAiResult(newAiResult);
      // 분석 결과를 바로 폼에 삽입
      setTitle(newAiResult.title);
      setContent(newAiResult.content);
      setCategory(newAiResult.category);
      setShowAnalysisResult(true);
    } catch (error) {
      console.error("이미지 분석 중 에러 발생:", error);
      setAnalysisError("이미지 분석에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAiResultConfirm = () => {
    console.log("AI 결과 확인 버튼 클릭");
    if (aiResult) {
      console.log("AI 결과 적용:", aiResult);
      setTitle(aiResult.title);
      setContent(aiResult.content);
      setCategory(aiResult.category);
      setShowAiResultModal(false);
      setShowAnalysisResult(true);
    }
  };

  const handleRetry = async () => {
    if (selectedImage) {
      await analyzeImage(selectedImage);
    }
  };

  const handleAdditionalImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = [...additionalImages, ...files];
    setAdditionalImages(newImages);
    setPreviewUrls((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index: number) => {
    if (index === 0) {
      setSelectedImage(null);
      setPreviewUrls((prev) => prev.slice(1));
      setShowAnalysisResult(false);
      setTitle("");
      setContent("");
      setCategory("");
    } else {
      setAdditionalImages((prev) => prev.filter((_, i) => i !== index - 1));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      showAlert("이미지를 선택해주세요.", "error");
      return;
    }

    if (!title) {
      showAlert("제목을 입력 해주세요.", "error");
      return;
    }
    if (!content) {
      showAlert("내용을 입력 해주세요.", "error");
      return;
    }
    if (!category) {
      showAlert("카테고리를 선택해주세요.", "error");
      return;
    }
    if (!rentalFee) {
      showAlert("대여료를 입력해주세요.", "error");
      return;
    }
    if (!category) {
      showAlert("카테고리를 선택해주세요.", "error");
      return;
    }

    try {
      const postData = {
        title,
        content,
        category,
        rentalFee: Number(rentalFee),
        deposit: Number(deposit),
        preferredLocation: {
          latitude: 37.517236,
          longitude: 127.047325,
        },
        address: preferredLocation,
      };

      await createPost(postData, [selectedImage, ...additionalImages]);
      showAlert("게시물이 등록되었습니다.", "success");

      resetForm();
      router.push("/home");
    } catch (error) {
      showAlert("게시물 등록을 실패하였습니다.", "error");
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="mb-6">
          <LoadingIcon />
        </div>
        <div className="mb-4">
          <Image
            src="/images/magicianBlueStar.png"
            alt="분석 대기 캐릭터"
            width={180}
            height={180}
            className="drop-shadow-lg"
            priority
          />
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-700 text-lg font-medium mb-1">
            AI가 이미지를 분석하고 있어요
          </p>
          <p className="text-gray-500 text-base">
            조금만 기다려주시면 곧 결과를 보여드릴게요!
          </p>
        </div>
      </div>
    );
  }

  if (showAiResultModal && aiResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        {/* 위로 올라간 smartBlueStar */}
        <div className="flex flex-col items-center w-full">
          <div
            className="relative flex flex-col items-center mb-4 transition-all duration-700"
            style={{ minHeight: 120 }}
          >
            <Image
              src="/images/smartBlueStar.png"
              alt="스마트 블루스타"
              width={120}
              height={120}
              className="drop-shadow-lg"
            />
          </div>
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                AI 분석 결과
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              이런 결과가 나왔어요!
            </h2>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                <div>
                  <div className="text-sm text-blue-700 font-semibold mb-1">
                    AI가 본 상태
                  </div>
                  <div className="text-base text-gray-800">
                    {aiResult.report}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <div>
                  <div className="text-sm text-gray-500 font-semibold mb-1">
                    자동 작성 제안
                  </div>
                  <div className="text-base text-gray-800">
                    {aiResult.autoFillMessage}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={handleAiResultConfirm}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                제안된 내용으로 작성하기
              </button>
              <button
                onClick={handleRetry}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                다시 분석하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showAnalysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <ProductRegisterHeader />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div className="relative w-60 max-w-full bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center animate-float mb-5">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 animate-pulse">
                <ImageIcon className="w-9 h-9 text-blue-400" />
              </div>
              <div className="w-28 h-4 bg-gray-200 rounded mb-2" />
              <div className="w-36 h-3 bg-gray-100 rounded mb-1" />
              <div className="w-32 h-3 bg-gray-100 rounded mb-1" />
              <div className="w-24 h-3 bg-gray-100 rounded" />
            </div>
            <div className="text-center mb-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                사진을 등록해주세요
              </h2>
              <p className="text-gray-500 text-base">
                AI가 게시물의 내용을 제안해줍니다!
              </p>
            </div>
            <label className="flex flex-col items-center cursor-pointer select-none mb-2">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleMainImageSelect}
              />
              <div className="relative flex flex-col items-center">
                <div className="bg-blue-500 hover:bg-blue-600 transition-all w-20 h-20 rounded-full flex items-center justify-center shadow-2xl animate-pulse ring-4 ring-blue-100">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <span className="mt-2 text-blue-500 font-semibold text-base">
                  사진 추가
                </span>
              </div>
            </label>
            {previewUrls[0] && (
              <div className="relative aspect-square w-full max-w-xs mx-auto mt-8 mb-4">
                <Image
                  src={previewUrls[0]}
                  alt="Preview"
                  fill
                  className="object-cover rounded-xl"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setPreviewUrls([]);
                    setAnalysisError(null);
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="mt-4 text-gray-400 text-sm">
              사진을 선택하거나 촬영하세요
            </div>
            {analysisError && (
              <div className="text-center mt-4">
                <p className="text-red-500 mb-2">{analysisError}</p>
                <button
                  onClick={handleRetry}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  다시 시도하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <ProductRegisterHeader />
      <div className="max-w-md mx-auto px-2 py-6">
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <div className="mb-2 text-gray-800 font-semibold text-base">
            이미지 등록
          </div>
          <div className="grid grid-cols-3 gap-2 mb-1">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {previewUrls.length < 5 && (
              <label className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAdditionalImageSelect}
                />
              </label>
            )}
          </div>
          <div className="text-gray-400 text-xs mb-2">
            최대 5장까지 등록할 수 있어요
          </div>
          {/* 분석 결과가 있으면 대표 이미지 아래에 상태 표시 */}
          {aiResult && (
            <div className="mt-2 bg-blue-50 rounded-lg p-3">
              <div className="text-xs text-blue-700 font-semibold mb-1">
                AI가 본 상태
              </div>
              <div className="text-sm text-gray-800 whitespace-pre-line">
                {aiResult.report}
              </div>
            </div>
          )}
        </div>
        {/* 제목 */}
        <div className="bg-white rounded-2xl shadow p-3 flex flex-col gap-1 mb-3">
          <label className="text-xs font-semibold text-gray-700 mb-1">
            제목
          </label>
          <div className="flex items-center gap-2">
            <Pencil className="w-4 h-4 text-blue-400 shrink-0" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글 제목을 입력하세요"
              maxLength={40}
              className="w-full bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 text-gray-900 placeholder-gray-300 outline-none"
            />
          </div>
        </div>
        {/* 설명 */}
        <div className="bg-white rounded-2xl shadow p-3 flex flex-col gap-1 mb-3">
          <label className="text-xs font-semibold text-gray-700 mb-1">
            설명
          </label>
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="나의 물건을 소개해주세요."
              rows={3}
              className="w-full bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 text-gray-900 placeholder-gray-300 outline-none resize-none"
            />
          </div>
        </div>
        {/* 대여금, 보증금 2단 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              1일 대여금
            </label>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-4 h-4 text-blue-400 shrink-0" />
              <input
                type="text"
                inputMode="numeric"
                value={rentalFee}
                onChange={(e) =>
                  setRentalFee(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="가격 입력"
                className="w-full bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 text-gray-900 placeholder-gray-300 outline-none"
              />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              보증금
            </label>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-4 h-4 text-blue-200 shrink-0" />
              <input
                type="text"
                inputMode="numeric"
                value={deposit}
                onChange={(e) =>
                  setDeposit(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="선택 입력"
                className="w-full bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-200 focus:ring-2 focus:ring-blue-50 p-2 text-gray-900 placeholder-gray-300 outline-none"
              />
            </div>
          </div>
        </div>
        {/* 카테고리 */}
        <div className="bg-white rounded-2xl shadow p-3 flex flex-col gap-1 mb-3">
          <label className="text-xs font-semibold text-gray-700 mb-1">
            카테고리
          </label>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="flex-1">
              <ProductRegisterCategorySelector
                value={category}
                onChange={setCategory}
              />
            </div>
          </div>
        </div>
        {/* 위치 */}
        <div className="bg-white rounded-2xl shadow p-3 flex flex-col gap-1 mb-3">
          <label className="text-xs font-semibold text-gray-700 mb-1">
            위치
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="flex-1">
              <ProductRegisterLocationSelector
                value={preferredLocation}
                onChange={setPreferredLocation}
              />
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 z-10 mt-6">
          <button
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg transition-all"
            onClick={handleSubmit}
            aria-label="상품 등록 완료"
          >
            작성 완료
          </button>
        </div>
      </div>
    </main>
  );
}
