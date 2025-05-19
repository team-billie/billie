package com.nextdoor.nextdoor.domain.post.service;

import com.nextdoor.nextdoor.domain.post.controller.dto.response.AnalyzeProductImageResponse;
import com.nextdoor.nextdoor.domain.post.service.dto.CreatePostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.CreatePostResult;
import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailResult;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import com.nextdoor.nextdoor.domain.post.service.dto.UpdatePostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.UpdatePostResult;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {

    Page<SearchPostResult> searchPostsByUserAddress(SearchPostCommand command);
    PostDetailResult getPostDetail(PostDetailCommand command);
    CreatePostResult createPost(CreatePostCommand command);
    AnalyzeProductImageResponse analyzeProductImage(MultipartFile productImage);
    boolean likePost(Long postId, Long memberId);
    boolean unlikePost(Long postId, Long memberId);
    boolean isPostLikedByMember(Long postId, Long memberId);
    int getPostLikeCount(Long postId);
    Page<SearchPostResult> getLikedPostsByMember(SearchPostCommand command);
    UpdatePostResult updatePost(UpdatePostCommand command);
    boolean deletePost(Long postId, Long userId);
}
