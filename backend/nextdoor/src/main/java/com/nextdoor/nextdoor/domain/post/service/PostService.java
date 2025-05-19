package com.nextdoor.nextdoor.domain.post.service;

import com.nextdoor.nextdoor.domain.post.controller.dto.response.AnalyzeProductImageResponse;
import com.nextdoor.nextdoor.domain.post.service.dto.CreatePostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.CreatePostResult;
import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailResult;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import com.nextdoor.nextdoor.domain.post.service.dto.UpdatePostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.UpdatePostResult;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {

    Page<SearchPostResult> searchPostsByUserAddress(SearchPostCommand command);
    PostDetailResult getPostDetail(Long postId);
    CreatePostResult createPost(CreatePostCommand command);
    AnalyzeProductImageResponse analyzeProductImage(MultipartFile productImage);

    /**
     * Adds a like to a post from a member
     * @param postId The ID of the post to like
     * @param memberId The ID of the member liking the post
     * @return true if the post was liked, false if it was already liked
     */
    boolean likePost(Long postId, Long memberId);

    /**
     * Removes a like from a post by a member
     * @param postId The ID of the post to unlike
     * @param memberId The ID of the member unliking the post
     * @return true if the post was unliked, false if it wasn't liked
     */
    boolean unlikePost(Long postId, Long memberId);

    /**
     * Checks if a post is liked by a member
     * @param postId The ID of the post to check
     * @param memberId The ID of the member to check
     * @return true if the post is liked by the member, false otherwise
     */
    boolean isPostLikedByMember(Long postId, Long memberId);

    /**
     * Gets the number of likes for a post
     * @param postId The ID of the post to get likes for
     * @return The number of likes for the post
     */
    int getPostLikeCount(Long postId);

    /**
     * Gets all posts liked by a member
     * @param command The search command containing the member ID and pagination information
     * @return A page of posts liked by the member
     */
    Page<SearchPostResult> getLikedPostsByMember(SearchPostCommand command);

    /**
     * Updates a post
     * @param command The command containing the post ID and the fields to update
     * @return The result of the update operation
     */
    UpdatePostResult updatePost(UpdatePostCommand command);

    /**
     * Deletes a post
     * @param postId The ID of the post to delete
     * @param userId The ID of the user deleting the post
     * @return true if the post was deleted, false otherwise
     */
    boolean deletePost(Long postId, Long userId);
}
