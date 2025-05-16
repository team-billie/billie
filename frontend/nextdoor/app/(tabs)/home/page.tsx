import { Metadata } from "next";
import PostList from "@/components/(tabs)/home/PostList";
import CreatePost from "@/components/(tabs)/home/CreatePost";
import { LocationEdit, Search, MapPin } from "lucide-react";

export function generateMetadata(): Metadata {
  return {
    title: "Home",
    description: "홈페이지입니다",
  };
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between px-4 text-gray900">
        <div className="flex items-center gap-1">
          <LocationEdit className="w-7 h-7" />
          <h1 className="text-2xl font-bold">전국구</h1>
        </div>
        <Search className="w-7 h-7" />
      </div>
      <main className="p-4 mb-20">
        <PostList />
      </main>
      <div>
        <CreatePost />
      </div>
    </div>
  );
}
