"use client"

import { useParams } from "next/navigation";
import SearchHeader from "@/components/search/SearchHeader";
import { useState } from "react";
import { Link } from "lucide-react";
import PostListItem from "@/components/(tabs)/home/PostListItem";
import { PostListItemDto } from "@/types/posts/response";

export default function SearchDetailPage() {
    const { id: rawId } = useParams();
    const id = decodeURIComponent(Array.isArray(rawId) ? rawId[0] : rawId || "");

    const [searchValue, setSearchValue] = useState(id || "");
    const handleSearch = (value: string) => {
        console.log(value);
    }
    
    const [postList, setPostList] = useState<PostListItemDto[]>([]);
    
    return (
        <div>
            <SearchHeader searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch}/>
            <div className="flex flex-col gap-4">
                {postList?.map((post: PostListItemDto) => (
                    <Link href={`/posts/${post.postId}`} key={post.postId}>
                        <PostListItem post={post} />
                    </Link>
                ))}
        </div>
        </div>
    )
}
