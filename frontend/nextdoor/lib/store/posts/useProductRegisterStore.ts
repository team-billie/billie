import { create } from "zustand";
import { ProductCondition } from "@/components/posts/register/ProductConditionModal";

interface ProductRegisterState {
  title: string;
  content: string;
  rentalFee: string;
  deposit: string;
  category: string;
  preferredLocation: string;
  isAiMode: boolean;
  images: File[];
  aiAnalyzed: boolean;
  condition: ProductCondition | null;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setRentalFee: (rentalFee: string) => void;
  setDeposit: (deposit: string) => void;
  setCategory: (category: string) => void;
  setPreferredLocation: (preferredLocation: string) => void;
  setIsAiMode: (isAiMode: boolean) => void;
  setImages: (images: File[]) => void;
  setCondition: (condition: ProductCondition | null) => void;
  handleAiToggle: (value: boolean) => void;
  resetForm: () => void;
}

const useProductRegisterStore = create<ProductRegisterState>((set) => ({
  title: "",
  content: "",
  rentalFee: "",
  deposit: "",
  category: "",
  preferredLocation: "",
  isAiMode: false,
  images: [],
  aiAnalyzed: false,
  condition: null,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setRentalFee: (rentalFee) => set({ rentalFee }),
  setDeposit: (deposit) => set({ deposit }),
  setCategory: (category) => set({ category }),
  setPreferredLocation: (preferredLocation) => set({ preferredLocation }),
  setIsAiMode: (isAiMode) => set({ isAiMode }),
  setImages: (images) => set({ images }),
  setCondition: (condition) => set({ condition }),
  handleAiToggle: (value) => set({ isAiMode: value }),
  resetForm: () =>
    set({
      title: "",
      content: "",
      rentalFee: "",
      deposit: "",
      category: "",
      preferredLocation: "",
      isAiMode: false,
      images: [],
      aiAnalyzed: false,
      condition: null,
    }),
}));

export default useProductRegisterStore; 