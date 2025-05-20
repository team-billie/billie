import { Heart, DollarSign } from "lucide-react";
import { PostListItemDto } from "@/types/posts/response/index";
import { useState } from "react";
import { formatNumberWithCommas } from "@/lib/utils/money";
import { PostLikeRequest, PostLikeDeleteRequest } from "@/lib/api/posts";

interface PostListItemProps {
  post: PostListItemDto;
}

export default function PostListItem({ post }: PostListItemProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeBtn = () => {
    if (isLiked) {
      PostLikeDeleteRequest(post.postId.toString());
    } else {
      PostLikeRequest(post.postId.toString());
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-4 border-b border-gray-200 pb-3">
      {/* //이미지 사진 */}
      <img
        src={post.productImage || "/images/default/post_default.png"}
        className="w-full h-28 bg-gray-200 rounded-xl"
      />
      <div className=" flex flex-col flex-1">
        <div className="flex justify-between pb-1">
          <div className="font-bold text-gray700">{post.title}</div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="flex gap-1 items-end">
              {/* 자간 늘리기 */}
              <div className="font-bold text-2xl tracking-wide">
                {formatNumberWithCommas(post.rentalFee)}₩
              </div>
            </div>
            <div className="flex  gap-1 items-end text-gray700">
              <div className="mr-1">보증금</div>
              <div className="font-bold text-lg tracking-wide">
                {formatNumberWithCommas(post.deposit)}₩
              </div>
            </div>
          </div>
          
          <div className="flex gap-1 items-center">
            <Heart className="w-5 h-5 text-blue400 fill-blue400" />
            <div className="text-blue400 font-bold">{post.likeCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
