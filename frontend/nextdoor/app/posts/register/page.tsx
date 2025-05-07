// "use client";

// import ProductRegisterHeader from "@/components/posts/register/ProductRegisterHeader";
// import ProductRegisterAiToggle from "@/components/posts/register/ProductRegisterAiToggle";
// import ProductRegisterFormGroup from "@/components/posts/register/ProductRegisterFormGroup";
// import ProductRegisterImageUpload from "@/components/posts/register/ProductRegisterImageUpload";
// import ProductRegisterSubmitButton from "@/components/posts/register/ProductRegisterSubmitButton";
// export default function PostRegisterPage() {
//   return (
//     <main>
//       <ProductRegisterHeader />
//       <ProductRegisterAiToggle />
//       <ProductRegisterImageUpload />
//       <ProductRegisterFormGroup title="제목" children={<div>제목</div>} />
//       <ProductRegisterFormGroup title="설명" children={<div>설명</div>} />
//       <ProductRegisterFormGroup title="1일 대여금" children={<div>1일 대여금</div>} />
//       <ProductRegisterFormGroup title="보증금" children={<div>보증금</div>} />
//       <ProductRegisterFormGroup title="카테고리" children={<div>카테고리</div>} />
//       <ProductRegisterFormGroup title="위치" children={<div>위치</div>} />
//       <ProductRegisterSubmitButton onClick={() => {}} />
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import ProductRegisterHeader from "@/components/posts/register/ProductRegisterHeader";
import ProductRegisterAiToggle from "@/components/posts/register/ProductRegisterAiToggle";
import ProductRegisterFormGroup from "@/components/posts/register/ProductRegisterFormGroup";
import ProductRegisterImageUpload from "@/components/posts/register/ProductRegisterImageUpload";
import ProductRegisterSubmitButton from "@/components/posts/register/ProductRegisterSubmitButton";
import ProductRegisterTextInput from "@/components/posts/register/ProductRegisterTextInput";
import ProductRegisterPriceInput from "@/components/posts/register/ProductRegisterPriceInput";
import ProductRegisterCategorySelector from "@/components/posts/register/ProductRegisterCategorySelector";
import ProductRegisterLocationSelector from "@/components/posts/register/ProductRegisterLocationSelector";

export default function PostRegisterPage() {
  // 상품 정보 상태 관리
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isAiMode, setIsAiMode] = useState(false);

  const handleSubmit = () => {
    // 필수 입력값 
    if (!title) {
      alert("제목을 입력해주세요");
      return;
    }
    
    if (!description) {
      alert("설명을 입력해주세요");
      return;
    }
    
    if (!rentalPrice) {
      alert("1일 대여금을 입력해주세요");
      return;
    }
    
    if (!category) {
      alert("카테고리를 선택해주세요");
      return;
    }
    
    if (!location) {
      alert("거래 희망 장소를 선택해주세요");
      return;
    }
    
    // 상품 등록 데이터
    const productData = {
      title,
      description,
      rentalPrice,
      deposit,
      category,
      location,
    };
    
    console.log("상품 등록 데이터:", productData);
    
    // 여기에 백엔드 API 연동 로직 추가 예정이이임이미임임임ㅇㅁㅁ
    
    // 임시 알림 --- 
    alert("상품 등록이 완료되었습니다!");
    
    // 실제 구현시 사용할꺼다 
    // router.push('/home');
  };

  // AI 모드 전환 핸들러
  const handleAiToggle = (value: boolean) => {
    setIsAiMode(value);
    
    // AI 모드가 켜지면 더미로 채우기 임시임  (추후에 AI API 호출)
    if (value) {
      setTitle("삼성 노트북 갤럭시북3");
      setDescription("거의 새 제품이며 상태 좋습니다. 단기 대여 가능합니다. 배터리 성능 좋고 충전기 함께 대여됩니다.");
      setRentalPrice("20000");
      setDeposit("200000");
      setCategory("디지털/가전");
      setLocation("부산광역시 부산진구");
    }
  };

  return (
    <main className="pb-20">
      <ProductRegisterHeader />
      
      {/* AI 토글 컴포넌트에 상태 및 핸들러 연결 */}
      <ProductRegisterAiToggle isAiToggle={isAiMode} toggleSwitch={() => handleAiToggle(!isAiMode)} />
      
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
          value={description}
          onChange={setDescription}
          placeholder="나의 물건을 소개해주세요.&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요."
          multiline={true}
        />
      </ProductRegisterFormGroup>
      
      {/* 1일 대여금 입력 폼 */}
      <ProductRegisterFormGroup title="1일 대여금">
        <ProductRegisterPriceInput 
          value={rentalPrice}
          onChange={setRentalPrice}
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
          onChange={setCategory}
        />
      </ProductRegisterFormGroup>
      
      {/* 위치 선택 폼 */}
      <ProductRegisterFormGroup title="위치">
        <ProductRegisterLocationSelector 
          value={location}
          onChange={setLocation}
        />
      </ProductRegisterFormGroup>
      
      {/* 제출 버튼 */}
      <ProductRegisterSubmitButton onClick={handleSubmit} />
    </main>
  );
}