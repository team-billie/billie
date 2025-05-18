"use client"

import { useParams, useRouter } from "next/navigation";
import SearchHeader from "@/components/search/SearchHeader";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PostListResponse } from "@/types/posts/response";
import { searchPosts } from "@/api/posts";
import Image from "next/image";

export default function SearchDetailPage() {
    const { id: rawId } = useParams();
    const router = useRouter();
    const id = decodeURIComponent(Array.isArray(rawId) ? rawId[0] : rawId || "");

    const [searchValue, setSearchValue] = useState(id || "");
    const [postList, setPostList] = useState<PostListResponse[]>([]);
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
        <div className="min-h-screen bg-gray-50">
            <SearchHeader searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch}/>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {postList.map((post) => (
                        <Link href={`/posts/${post.postId}`} key={post.postId}>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={post.productImage || '/placeholder.png'}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">{post.title}</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">보증금: {post.deposit}원</p>
                                        <p className="text-sm text-gray-600">대여료: {post.rentalFee}원</p>
                                    </div>
                                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                                        <span>❤️ {post.likeCount}</span>
                                        <span>거래 {post.dealCount}회</span>
                                    </div>
                                </div>
                            </div>
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
