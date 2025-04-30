import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Home",
    description: "홈페이지입니다",
  };
}

export default function HomePage() {
  return (
    <main className="p-24">
      <h1 className="text-4xl font-bold">Home</h1>
    </main>
  );
}
