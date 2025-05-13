// lib/store/useProductRegisterStore.ts
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
  images: FileList | null;

  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setRentalFee: (rentalFee: string) => void;
  setDeposit: (deposit: string) => void;
  setCategory: (category: CategoryType) => void;
  setPreferredLocation: (preferredLocation: string) => void;
  setIsAiMode: (isAiMode: boolean) => void;
  setImages: (images: FileList | null) => void;
  handleAiToggle: (value: boolean) => void;
  resetForm: () => void;
}

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
      images: null,

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
            category: "DIGITAL_DEVICE",
            preferredLocation: "부산광역시 강서구 명지동",
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
          images: null,
        }),
    }),
    {
      name: "product-register-storage", // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useProductRegisterStore;
