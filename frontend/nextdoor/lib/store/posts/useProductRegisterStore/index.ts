// lib/store/useProductRegisterStore.ts
import { LocationType } from "@/types/posts/request";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 스토어 상태 타입 정의
interface ProductRegisterState {
  title: string;
  content: string;
  rentalFee: string;
  deposit: string;
  category: CategoryType;
  preferredLocation: string;
  isAiMode: boolean;
  images: File[];

  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setRentalFee: (rentalFee: string) => void;
  setDeposit: (deposit: string) => void;
  setCategory: (category: CategoryType) => void;
  setPreferredLocation: (preferredLocation: string) => void;
  setIsAiMode: (isAiMode: boolean) => void;
  setImages: (images: File[]) => void;
  handleAiToggle: (value: boolean) => void;
  resetForm: () => void;
}

// Zustand의 persist middleware는 File 객체를 직렬화할 수 없으므로,
// 이미지 상태만 제외하고 저장하도록 설정
const useProductRegisterStore = create<ProductRegisterState>()(
  persist(
    (set) => ({
      // 상품 등록 정보 상태
      title: "",
      content: "",
      rentalFee: "",
      deposit: "",
      category: "" as CategoryType,
      preferredLocation: "",
      isAiMode: false,
      images: [],

      // 상태 업데이트 함수들
      setTitle: (title) => set({ title }),
      setContent: (content) => set({ content }),
      setRentalFee: (rentalFee) => set({ rentalFee }),
      setDeposit: (deposit) => set({ deposit }),
      setCategory: (category) => set({ category }),
      setPreferredLocation: (preferredLocation) => set({ preferredLocation }),
      setIsAiMode: (isAiMode) => set({ isAiMode }),
      setImages: (images) => set({ images }),

      // AI 모드 전환 함수
      handleAiToggle: (value) => {
        set({ isAiMode: value });
        if (value) {
          set({
            title: "삼성 노트북 갤럭시북3",
            content:
              "거의 새 제품이며 상태 좋습니다. 단기 대여 가능합니다. 배터리 성능 좋고 충전기 함께 대여됩니다.",
            rentalFee: "20000",
            deposit: "20000",
            category: "디지털기기",
            preferredLocation: "부산광역시 강서구 명지동 ",
          });
        }
      },

      // 폼 초기화 함수
      resetForm: () =>
        set({
          title: "",
          content: "",
          rentalFee: "",
          deposit: "",
          category: "" as CategoryType,
          preferredLocation: "",
          isAiMode: false,
          images: [],
        }),
    }),
    {
      name: "product-register-storage", // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({
        // images를 제외한 나머지 상태만 저장
        title: state.title,
        content: state.content,
        rentalFee: state.rentalFee,
        deposit: state.deposit,
        category: state.category,
        preferredLocation: state.preferredLocation,
        isAiMode: state.isAiMode,
      }),
    }
  )
);

export default useProductRegisterStore;
