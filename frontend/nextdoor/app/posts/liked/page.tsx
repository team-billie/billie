"use client"

import PostListItem from "@/components/(tabs)/home/PostListItem";
import { LocationEdit, Search, MapPin } from "lucide-react";
import { GetPostLikeListRequest } from "@/lib/api/posts";
import Header from "@/components/pays/common/Header";
import Link from "next/link";
import useUserStore from "@/lib/store/useUserStore";
import { useState, useEffect } from "react";
import { PostListItemDto } from "@/types/posts/response";

export default function HomePage() {

    const { userId } = useUserStore();
    const [postList, setPostList] = useState<PostListItemDto[]>([]);

    useEffect(() => {
        if (userId) {
            GetPostLikeListRequest(userId.toString()).then((res) => {
                setPostList(res.content);
            });
        }
    }, []);

    return (
        <div className="flex flex-col">
            <Header txt="관심 물품" />
            <main className="p-4 mb-20">
                {postList.map((post: PostListItemDto) => (
                    <Link href={`/posts/${post.postId}`} key={post.postId}>
                        <PostListItem key={post.postId} post={post} />
                    </Link>
                ))}
            </main>
        </div>
    );
}
