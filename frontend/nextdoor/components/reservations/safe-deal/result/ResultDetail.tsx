import { useTestUserStore } from "@/lib/store/useTestUserStore";

export default function ResultDetail() {
  const { userId } = useTestUserStore();
  console.log("ResultDetail userId:", userId);

  // userId가 없으면 렌더링하지 않음
  if (!userId) {
    return null;
  }

  // ... rest of the existing code ...
} 