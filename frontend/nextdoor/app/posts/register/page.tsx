"use client";

import ProductRegisterHeader from "@/components/posts/register/ProductRegisterHeader";
import ProductRegisterAiToggle from "@/components/posts/register/ProductRegisterAiToggle";
import ProductRegisterFormGroup from "@/components/posts/register/ProductRegisterFormGroup";
import ProductRegisterImageUpload from "@/components/posts/register/ProductRegisterImageUpload";
import ProductRegisterSubmitButton from "@/components/posts/register/ProductRegisterSubmitButton";
import ProductRegisterTextInput from "@/components/posts/register/ProductRegisterTextInput";
import ProductRegisterPriceInput from "@/components/posts/register/ProductRegisterPriceInput";
import ProductRegisterCategorySelector from "@/components/posts/register/ProductRegisterCategorySelector";
import ProductRegisterLocationSelector from "@/components/posts/register/ProductRegisterLocationSelector";
import { postCreateRequest } from "@/lib/api/posts/request";
import useUserStore from "@/lib/store/useUserStore";
import useProductRegisterStore from "@/lib/store/posts/useProductRegisterStore";

export default function PostRegisterPage() {
  // 전역 상태 관리 훅 사용
  const {
    title,
    content,
    rentalFee,
    deposit,
    category,
    preferredLocation,
    isAiMode,
    images,
    setTitle,
    setContent,
    setRentalFee,
    setDeposit,
    setCategory,
    setPreferredLocation,
    setIsAiMode,
    setImages,
    handleAiToggle,
  } = useProductRegisterStore();
  const { userId } = useUserStore();
  console.log("userId", userId);
  const handleSubmit = async () => {
    try {
      // 필수 입력값 검증
      if (!title) {
        alert("제목을 입력해주세요");
        return;
      }

      if (!content) {
        alert("설명을 입력해주세요");
        return;
      }

      if (!rentalFee) {
        alert("1일 대여금을 입력해주세요");
        return;
      }

      if (!category) {
        alert("카테고리를 선택해주세요");
        return;
      }

      if (!preferredLocation) {
        alert("거래 희망 장소를 선택해주세요");
        return;
      }

      // 상품 등록 데이터
      const productData = {
        title,
        content,
        category,
        rentalFee: Number(rentalFee),
        deposit: Number(deposit),
        preferredLocation,
      };

      // FileList를 File[]로 변환
      const imageFiles = images ? Array.from(images) : null;

      // API 호출
      const res = await postCreateRequest(productData, imageFiles, userId);
      // 성공 처리
      alert("상품 등록이 완료되었습니다!");

      // 폼 데이터 초기화
      useProductRegisterStore.getState().resetForm();
      // TODO: 성공 후 리다이렉트 처리
      // router.push('/home');
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };
  // 카테고리 선택 핸들러
  const handleCategoryChange = (selectedCategory: CategoryType) => {
    setCategory(selectedCategory);
  };
  return (
    <main className="pb-20">
      <ProductRegisterHeader />

      {/* AI 토글 컴포넌트에 상태 및 핸들러 연결 */}
      <ProductRegisterAiToggle
        isAiToggle={isAiMode}
        toggleSwitch={() => handleAiToggle(!isAiMode)}
      />

      {/* 이미지 업로드 컴포넌트 */}
      <ProductRegisterImageUpload />

      {/* 제목 입력 폼 */}
      <ProductRegisterFormGroup title="제목">
        <ProductRegisterTextInput
          value={title}
          onChange={setTitle}
          placeholder="글 제목"
          maxLength={40}
        />
      </ProductRegisterFormGroup>

      {/* 설명 입력 폼 */}
      <ProductRegisterFormGroup title="설명">
        <ProductRegisterTextInput
          value={content}
          onChange={setContent}
          placeholder="나의 물건을 소개해주세요.&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요."
          multiline={true}
        />
      </ProductRegisterFormGroup>

      {/* 1일 대여금 입력 폼 */}
      <ProductRegisterFormGroup title="1일 대여금">
        <ProductRegisterPriceInput
          value={rentalFee}
          onChange={setRentalFee}
          placeholder="가격 입력"
        />
      </ProductRegisterFormGroup>

      {/* 보증금 입력 폼 */}
      <ProductRegisterFormGroup title="보증금">
        <ProductRegisterPriceInput
          value={deposit}
          onChange={setDeposit}
          placeholder="선택 입력"
        />
      </ProductRegisterFormGroup>

      {/* 카테고리 선택 폼 */}
      <ProductRegisterFormGroup title="카테고리">
        <ProductRegisterCategorySelector
          value={category}
          onChange={handleCategoryChange}
        />
      </ProductRegisterFormGroup>

      {/* 위치 선택 폼 */}
      <ProductRegisterFormGroup title="위치">
        <ProductRegisterLocationSelector
          value={preferredLocation}
          onChange={setPreferredLocation}
        />
      </ProductRegisterFormGroup>

      {/* 제출 버튼 */}
      <ProductRegisterSubmitButton onClick={handleSubmit} />
    </main>
  );
}
