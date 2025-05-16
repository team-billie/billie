"use client";

import { GetPostListRequest } from "@/lib/api/posts";
import { PostListItemDto } from "@/types/posts/response";
import { useState, useEffect } from "react";
import useUserStore from "@/lib/store/useUserStore";
import PostListItem from "../PostListItem";
import Link from "next/link";

export default function PostList() {
  const { userId, address } = useUserStore();
  const [postList, setPostList] = useState<PostListItemDto[] | null>(null);

  useEffect(() => {
    if (userId && address) {
      GetPostListRequest(String(userId)).then((res) => {
        console.log(res.content);
        setPostList(res.content);
      });
    }
  }, [userId]);
  return (
    <div className="flex flex-col gap-4">
      {postList?.map((post: PostListItemDto) => (
        <Link href={`/posts/${post.postId}`} key={post.postId}>
          <PostListItem post={post} />
        </Link>
      ))}
    </div>
  );
}
