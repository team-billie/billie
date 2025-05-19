"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/posts/new")}
      className="fixed bottom-24 right-4 bg-bluegradient2 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg z-50"
    >
      <Plus className="w-6 h-6 text-white" />
    </div>
  );
}
