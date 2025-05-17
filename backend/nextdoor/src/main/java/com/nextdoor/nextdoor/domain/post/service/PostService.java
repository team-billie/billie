package com.nextdoor.nextdoor.domain.post.service;

import com.nextdoor.nextdoor.domain.post.controller.dto.response.AnalyzeProductImageResponse;
import com.nextdoor.nextdoor.domain.post.service.dto.CreatePostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.CreatePostResult;
import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailResult;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {

    Page<SearchPostResult> searchPostsByUserAddress(SearchPostCommand command);
    PostDetailResult getPostDetail(Long postId);
    CreatePostResult createPost(CreatePostCommand command);
    AnalyzeProductImageResponse analyzeProductImage(MultipartFile productImage);
}
