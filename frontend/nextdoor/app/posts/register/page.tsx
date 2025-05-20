// "use client";

// import ProductRegisterHeader from "@/components/posts/register/ProductRegisterHeader";
// import ProductRegisterAiToggle from "@/components/posts/register/ProductRegisterAiToggle";
// import ProductRegisterFormGroup from "@/components/posts/register/ProductRegisterFormGroup";
// import ProductRegisterImageUpload from "@/components/posts/register/ProductRegisterImageUpload";
// import ProductRegisterSubmitButton from "@/components/posts/register/ProductRegisterSubmitButton";
// import ProductRegisterTextInput from "@/components/posts/register/ProductRegisterTextInput";
// import ProductRegisterPriceInput from "@/components/posts/register/ProductRegisterPriceInput";
// import ProductRegisterCategorySelector from "@/components/posts/register/ProductRegisterCategorySelector";
// import ProductRegisterLocationSelector from "@/components/posts/register/ProductRegisterLocationSelector";
// import { postCreateRequest } from "@/lib/api/posts/request";
// import useUserStore from "@/lib/store/useUserStore";
// import useProductRegisterStore from "@/lib/store/posts/useProductRegisterStore";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ProductCondition } from "@/components/posts/register/ProductConditionModal";
// import AnalyzingPage from "@/components/posts/register/AnalyzingPage";

// export default function PostRegisterPage() {
//   // 전역 상태 관리 훅 사용
//   const {
//     title,
//     content,
//     rentalFee,
//     deposit,
//     category,
//     preferredLocation,
//     isAiMode,
//     images,
//     aiAnalyzed,
//     condition,
//     setTitle,
//     setContent,
//     setRentalFee,
//     setDeposit,
//     setCategory,
//     setPreferredLocation,
//     setIsAiMode,
//     setImages,
//     setCondition,
//     handleAiToggle,
//   } = useProductRegisterStore();
//   const { userId } = useUserStore();
//   const router = useRouter();
//   const pathname = usePathname();
  
//   // 위치 페이지에서 돌아왔는지 추적
//   const [isFromLocationPage, setIsFromLocationPage] = useState(false);
//   // 현재 페이지에 방문했음을 기록
//   const [isPageVisited, setIsPageVisited] = useState(false);
//   const [aiResult, setAiResult] = useState<{
//     title: string;
//     content: string;
//     category: string;
//     condition: ProductCondition;
//   } | null>(null);
//   const [showAiResultModal, setShowAiResultModal] = useState(false);

//   // 위치 페이지에서 돌아왔는지 감지
//   useEffect(() => {
//     // 이전에 방문한 적이 있고, 현재 경로가 다시 등록 페이지면
//     const wasAtLocationPage = sessionStorage.getItem("wasAtLocationPage");
//     if (wasAtLocationPage === "true") {
//       setIsFromLocationPage(true);
//       // 플래그 초기화
//       sessionStorage.removeItem("wasAtLocationPage");
//     }
    
//     // 처음 방문인지 확인
//     const firstVisit = sessionStorage.getItem("postRegisterFirstVisit");
//     if (!firstVisit) {
//       // 처음 방문이면 세션 스토리지 초기화 (홈에서 왔을 때)
//       clearSessionStorage();
//       sessionStorage.setItem("postRegisterFirstVisit", "true");
//     }
    
//     setIsPageVisited(true);
//   }, []);
  
//   // 위치 페이지로 이동 시에 플래그 설정
//   useEffect(() => {
//     if (isPageVisited && pathname.includes("/location")) {
//       sessionStorage.setItem("wasAtLocationPage", "true");
//     }
//   }, [pathname, isPageVisited]);

//   // 1. 마운트 시 sessionStorage에서 복원 (위치 페이지에서 온 경우만)
//   useEffect(() => {
//     const saved = sessionStorage.getItem("postRegisterForm");
//     if (saved) {
//       const data = JSON.parse(saved);
//       setTitle(data.title || "");
//       setContent(data.content || "");
//       setRentalFee(data.rentalFee || "");
//       setDeposit(data.deposit || "");
//       setCategory(data.category || "");
//       setPreferredLocation(data.preferredLocation || "");
//       setIsAiMode(data.isAiMode || false);
//       // images는 ProductRegisterImageUpload에서 복원됨
//     }
//   }, [isFromLocationPage]);

//   // 2. 값이 바뀔 때마다 sessionStorage에 저장
//   useEffect(() => {
//     if (isPageVisited) {
//       sessionStorage.setItem("postRegisterForm", JSON.stringify({
//         title, content, rentalFee, deposit, category, preferredLocation, isAiMode, aiAnalyzed
//       }));
//     }
//   }, [title, content, rentalFee, deposit, category, preferredLocation, isAiMode, aiAnalyzed, isPageVisited]);

//   // 3. 홈 등으로 나갈 때만 sessionStorage/상태 초기화
//   useEffect(() => {
//     return () => {
//       // 위치 페이지로 이동하는 경우는 제외하고 초기화
//       if (!pathname.includes("/location")) {
//         clearSessionStorage();
//       }
//     };
//   }, [pathname]);
  
//   // 세션 스토리지 초기화 함수
//   const clearSessionStorage = () => {
//     sessionStorage.removeItem("postRegisterFirstVisit");
//     sessionStorage.removeItem("postRegisterVisited");
//     sessionStorage.removeItem("postRegisterForm");
//     sessionStorage.removeItem("postRegisterImages");
//     sessionStorage.removeItem("wasAtLocationPage");
//   };

//   const handleSubmit = async () => {
//     try {
//       // 필수 입력값 검증
//       if (!title) {
//         alert("제목을 입력해주세요");
//         return;
//       }

//       if (!content) {
//         alert("설명을 입력해주세요");
//         return;
//       }

//       if (!rentalFee) {
//         alert("1일 대여금을 입력해주세요");
//         return;
//       }

//       if (!category) {
//         alert("카테고리를 선택해주세요");
//         return;
//       }

//       if (!preferredLocation) {
//         alert("거래 희망 장소를 선택해주세요");
//         return;
//       }

//       // 상품 등록 데이터
//       const productData = {
//         title,
//         content,
//         category,
//         rentalFee: Number(rentalFee),
//         deposit: Number(deposit),
//         preferredLocation: {
//           latitude: 37.517236,
//           longitude: 127.047325,
//         },
//         address: "서울시 강남구",
//       };

//       // API 호출
//       const res = await postCreateRequest(productData, images, userId);
//       // 성공 처리
//       alert("상품 등록이 완료되었습니다!");
//       clearSessionStorage();
//       router.push("/home");
//       // 폼 데이터 초기화
//       useProductRegisterStore.getState().resetForm();
//     } catch (error) {
//       console.error("상품 등록 실패:", error);
//       alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
//     }
//   };
//   // 카테고리 선택 핸들러
//   const handleCategoryChange = (selectedCategory: CategoryType) => {
//     setCategory(selectedCategory);
//   };

//   // AI 분석 결과 처리 (분석 결과 안내만 띄움)
//   const handleAiAnalyzeResult = (result: {
//     title: string;
//     content: string;
//     category: string;
//     condition: ProductCondition;
//   }) => {
//     console.log("[page.tsx] handleAiAnalyzeResult 호출", result);
//     setAiResult(result);
//     setShowAiResultModal(true);
//   };

//   // AI 분석 결과 '다음' 클릭 시 폼에 값 채움
//   const handleAiResultConfirm = () => {
//     if (aiResult) {
//       setTitle(aiResult.title);
//       setContent(aiResult.content);
//       setCategory(aiResult.category as CategoryType);
//       setCondition(aiResult.condition);
//       setShowAiResultModal(false);
//     }
//   };

//   // 렌더링 시점에 로그를 찍기 위한 useEffect 추가
//   useEffect(() => {
//     if (showAiResultModal && aiResult) {
//       console.log("[page.tsx] AnalyzingPage 렌더", aiResult, showAiResultModal);
//     }
//   }, [showAiResultModal, aiResult]);

//   return (
//     <main className="pb-20">
//       <ProductRegisterHeader />

//       {/* AI 토글 컴포넌트에 상태 및 핸들러 연결 */}
//       <ProductRegisterAiToggle
//         isAiToggle={isAiMode}
//         toggleSwitch={() => handleAiToggle(!isAiMode)}
//       />

//       {/* 이미지 업로드 컴포넌트 - isFromLocationPage prop 추가 */}
//       <ProductRegisterImageUpload 
//         value={images} 
//         onChange={setImages}
//         isAiMode={isAiMode}
//         isFromLocationPage={isFromLocationPage}
//         onAiAnalyzeResult={handleAiAnalyzeResult}
//       />

//       {showAiResultModal && aiResult && (
//         <AnalyzingPage
//           isAnalyzing={false}
//           condition={aiResult.condition}
//           onNext={handleAiResultConfirm}
//         />
//       )}

//       {/* 제목 입력 폼 */}
//       <ProductRegisterFormGroup title="제목">
//         <ProductRegisterTextInput
//           value={title}
//           onChange={setTitle}
//           placeholder="글 제목"
//           maxLength={40}
//         />
//       </ProductRegisterFormGroup>

//       {/* 설명 입력 폼 */}
//       <ProductRegisterFormGroup title="설명">
//         <ProductRegisterTextInput
//           value={content}
//           onChange={setContent}
//           placeholder="나의 물건을 소개해주세요.&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요."
//           multiline={true}
//         />
//       </ProductRegisterFormGroup>

//       {/* 1일 대여금 입력 폼 */}
//       <ProductRegisterFormGroup title="1일 대여금">
//         <ProductRegisterPriceInput
//           value={rentalFee}
//           onChange={setRentalFee}
//           placeholder="가격 입력"
//         />
//       </ProductRegisterFormGroup>

//       {/* 보증금 입력 폼 */}
//       <ProductRegisterFormGroup title="보증금">
//         <ProductRegisterPriceInput
//           value={deposit}
//           onChange={setDeposit}
//           placeholder="선택 입력"
//         />
//       </ProductRegisterFormGroup>

//       {/* 카테고리 선택 폼 */}
//       <ProductRegisterFormGroup title="카테고리">
//         <ProductRegisterCategorySelector
//           value={category}
//           onChange={handleCategoryChange}
//         />
//       </ProductRegisterFormGroup>

//       {/* 위치 선택 폼 */}
//       <ProductRegisterFormGroup title="위치">
//         <ProductRegisterLocationSelector
//           value={preferredLocation}
//           onChange={setPreferredLocation}
//         />
//       </ProductRegisterFormGroup>

//       {/* 제출 버튼 */}
//       <ProductRegisterSubmitButton onClick={handleSubmit} />
//     </main>
//   );
// }