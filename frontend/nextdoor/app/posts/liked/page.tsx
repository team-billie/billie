"use client"

import PostListItem from "@/components/(tabs)/home/PostListItem";
import { LocationEdit, Search, MapPin, Loader2 } from "lucide-react";
import { GetPostLikeListRequest } from "@/lib/api/posts";
import Header from "@/components/pays/common/Header";
import Link from "next/link";
import useUserStore from "@/lib/store/useUserStore";
import { useState, useEffect } from "react";
import { PostListItemDto } from "@/types/posts/response";

export default function HomePage() {

    const { userId } = useUserStore();
    const [postList, setPostList] = useState<PostListItemDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            setIsLoading(true);
            GetPostLikeListRequest(userId.toString()).then((res) => {
                setPostList(res.content);
                setIsLoading(false);
            });
        }
    }, []);

    return (
        <div className="flex flex-col">
            <Header txt="관심 물품" />
            <main className="p-4 mb-20">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 text-gray900">
                        {postList.map((post: PostListItemDto) => (
                            <Link href={`/posts/${post.postId}`} key={post.postId}>
                                <PostListItem key={post.postId} post={post} />
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
