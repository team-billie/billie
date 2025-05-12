import { Metadata } from "next";
import PostList from "@/components/(tabs)/home/PostList";

export function generateMetadata(): Metadata {
  return {
    title: "Home",
    description: "홈페이지입니다",
  };
}

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-2 text-blue400">Home</h1>
      <PostList />
    </main>
  );
}
