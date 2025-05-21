"use client";

import { GetPostListRequest } from "@/lib/api/posts";
import { PostListItemDto } from "@/types/posts/response/index";
import { useState, useEffect, useRef, useCallback } from "react";
import useUserStore from "@/lib/store/useUserStore";
import PostListItem from "../PostListItem";
import Link from "next/link";
import Category from "../Category";

export default function PostList() {
  const { userId, address } = useUserStore();
  const [postList, setPostList] = useState<PostListItemDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = 10;
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback((node: HTMLAnchorElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const fetchPosts = async (page: number) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await GetPostListRequest(String(userId), page, pageSize);
      if (page === 0) {
        setPostList(response.content);
      } else {
        setPostList(prev => [...prev, ...response.content]);
      }
      setHasMore(response.content.length === pageSize);
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

  return (
    <>
      {/* 카테고리 */}
      <Category />
      <div className="mt-2 flex flex-col gap-4">
        {postList.length > 0 ? (
          <div className="flex flex-col gap-3 text-gray900">
            {postList.map((post: PostListItemDto, index: number) => (
              <Link 
                href={`/posts/${post.postId}`} 
                key={post.postId}
                ref={index === postList.length - 1 ? lastPostElementRef : null}
              >
                <PostListItem post={post} />
              </Link>
            ))}
          </div>
        ) : !isLoading ? (
          <div className="py-8 text-center text-gray-500">게시글이 없습니다.</div>
        ) : null}

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <div className="py-4 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          </div>
        )}
      </div>
    </>
  );
}
