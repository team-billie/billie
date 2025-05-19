"use client"

import { useParams, useRouter } from "next/navigation";
import SearchHeader from "@/components/search/SearchHeader";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PostListItemDto } from "@/types/posts/response";
import { searchPosts } from "@/lib/api/posts";
import Image from "next/image";
import PostListItem from "@/components/(tabs)/home/PostListItem";

export default function SearchDetailPage() {
    const { id: rawId } = useParams();
    const router = useRouter();
    const id = decodeURIComponent(Array.isArray(rawId) ? rawId[0] : rawId || "");

    const [searchValue, setSearchValue] = useState(id || "");
    const [postList, setPostList] = useState<PostListItemDto[]>([]);   
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const handleSearch = async (value: string) => {
        router.push(`/search/${value}`);
    }

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await searchPosts({
                keyword: searchValue,
                page,
                size: 10,
                sort: 'createdAt',
                direction: 'DESC'
            });
            
            if (page === 0) {
                setPostList(response.content);
            } else {
                setPostList(prev => [...prev, ...response.content]);
            }
            
            setHasMore(!response.last);
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(0);
        fetchPosts();
    }, [searchValue]);

    useEffect(() => {
        if (page > 0) {
            fetchPosts();
        }
    }, [page]);

    return (
        <div className="min-h-screen">
            <SearchHeader searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch}/>
            <div className="max-w-7xl mx-auto px-4 pt-2">
            <div className="flex flex-col gap-3 text-gray900">
                {postList.map((post: PostListItemDto) => (
                <Link href={`/posts/${post.postId}`} key={post.postId}>
                    <PostListItem post={post} />
                </Link>
                ))}
            </div>
                
                {loading && (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    </div>
                )}
                
                {!loading && hasMore && (
                    <div className="text-center py-4">
                        <button
                            onClick={() => setPage(prev => prev + 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            더 보기
                        </button>
                    </div>
                )}
                
                {!loading && postList.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">검색 결과가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
