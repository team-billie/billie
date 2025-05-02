
import ProductRegisterHeader from "@/components/posts/register/ProductRegisterHeader";
import ProductRegisterAiToggle from "@/components/posts/register/ProductRegisterAiToggle";
import ProductRegisterFormGroup from "@/components/posts/register/ProductRegisterFormGroup";
import ProductRegisterImageUpload from "@/components/posts/register/ProductRegisterImageUpload";
export default function PostRegisterPage() {
  return (
    <main>
      <ProductRegisterHeader />
      <ProductRegisterAiToggle />
      <ProductRegisterImageUpload />
      <ProductRegisterFormGroup title="제목" children={<div>제목</div>} />
      <ProductRegisterFormGroup title="설명" children={<div>설명</div>} />
      <ProductRegisterFormGroup title="1일 대여금" children={<div>1일 대여금</div>} />
      <ProductRegisterFormGroup title="보증금" children={<div>보증금</div>} />
      <ProductRegisterFormGroup title="카테고리" children={<div>카테고리</div>} />
      <ProductRegisterFormGroup title="위치" children={<div>위치</div>} />
    </main>
  );
}
