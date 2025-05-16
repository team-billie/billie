"use client";

import { GetPostListRequest } from "@/lib/api/posts";
import { PostListItemDto } from "@/types/posts/response";
import { useState, useEffect } from "react";
import useUserStore from "@/lib/store/useUserStore";
import PostListItem from "../PostListItem";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PostList() {
  const { userId, address } = useUserStore();
  const [postList, setPostList] = useState<PostListItemDto[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = 10;

  const fetchPosts = async (page: number) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await GetPostListRequest(String(userId), page, pageSize);
      setPostList(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts(currentPage);
    }
  }, [userId, address, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="py-8 text-center text-gray-500">로딩 중...</div>
      ) : postList && postList.length > 0 ? (
        <>
          <div className="flex flex-col gap-4 text-gray900">
            {postList.map((post: PostListItemDto) => (
              <Link href={`/posts/${post.postId}`} key={post.postId}>
                <PostListItem post={post} />
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0
                  ? "text-gray-400"
                  : "text-gray900 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium">
              {currentPage + 1} / {totalPages || 1}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className={`p-2 rounded-full ${
                currentPage >= totalPages - 1
                  ? "text-gray-400"
                  : "text-gray900 hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <div className="py-8 text-center text-gray-500">게시글이 없습니다.</div>
      )}
    </div>
  );
}
