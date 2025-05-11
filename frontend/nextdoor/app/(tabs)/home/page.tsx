import { Metadata } from "next";
import PostIistItem from "@/components/(tabs)/home/PostIistItem";

export function generateMetadata(): Metadata {
  return {
    title: "Home",
    description: "홈페이지입니다",
  };
}

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold">Home</h1>
      <PostIistItem />
    </main>
  );
}
