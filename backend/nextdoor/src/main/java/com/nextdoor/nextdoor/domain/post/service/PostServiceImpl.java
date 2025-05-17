package com.nextdoor.nextdoor.domain.post.service;

import com.nextdoor.nextdoor.domain.post.controller.dto.response.AnalyzeProductImageResponse;
import com.nextdoor.nextdoor.domain.post.domain.Post;
import com.nextdoor.nextdoor.domain.post.domain.PostLikeCount;
import com.nextdoor.nextdoor.domain.post.exception.NoSuchPostException;
import com.nextdoor.nextdoor.domain.post.exception.PostImageUploadException;
import com.nextdoor.nextdoor.domain.post.mapper.PostMapper;
import com.nextdoor.nextdoor.domain.post.port.PostQueryPort;
import com.nextdoor.nextdoor.domain.post.port.ProductImageAnalysisPort;
import com.nextdoor.nextdoor.domain.post.port.S3ImageUploadPort;
import com.nextdoor.nextdoor.domain.post.repository.PostLikeCountRepository;
import com.nextdoor.nextdoor.domain.post.repository.PostLikeRepository;
import com.nextdoor.nextdoor.domain.post.repository.PostRepository;
import com.nextdoor.nextdoor.domain.post.service.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostQueryPort postQueryPort;
    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostLikeCountRepository postLikeCountRepository;
    private final S3ImageUploadPort s3ImageUploadPort;
    private final PostMapper postMapper;
    private final ProductImageAnalysisPort productImageAnalysisPort;

    @Override
    @Transactional(readOnly = true)
    public Page<SearchPostResult> searchPostsByUserAddress(SearchPostCommand command) {
        return postQueryPort.searchPostsByMemberAddress(command);
    }

    @Override
    @Transactional(readOnly = true)
    public PostDetailResult getPostDetail(Long postId) {
        return postQueryPort.getPostDetail(postId);
    }

    @Override
    @Transactional
    public CreatePostResult createPost(CreatePostCommand command) {
        Double latitude = null;
        Double longitude = null;
        if (command.getPreferredLocation() != null) {
            latitude = command.getPreferredLocation().getLatitude();
            longitude = command.getPreferredLocation().getLongitude();
        }

        Post post = Post.builder()
                .title(command.getTitle())
                .content(command.getContent())
                .rentalFee(command.getRentalFee())
                .deposit(command.getDeposit())
                .address(command.getAddress())
                .latitude(latitude)
                .longitude(longitude)
                .category(command.getCategory())
                .authorId(command.getAuthorId())
                .productImages(new ArrayList<>())
                .build();

        Post savedPost = postRepository.save(post);

        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile image : command.getProductImages()) {
            try {
                String imageUrl = s3ImageUploadPort.uploadProductImage(image, savedPost.getId());
                imageUrls.add(imageUrl);
                savedPost.addProductImage(imageUrl);
            } catch (Exception e) {
                throw new PostImageUploadException("게시물 이미지 업로드에 실패했습니다.", e);
            }
        }

        return postMapper.toCreateResult(savedPost, imageUrls);
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyzeProductImageResponse analyzeProductImage(MultipartFile productImage) {
        return productImageAnalysisPort.analyzeProductImage(productImage);
    }

    @Override
    @Transactional
    public boolean likePost(Long postId, Long memberId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchPostException("ID가 " + postId + "인 게시물이 존재하지 않습니다."));

        if (postLikeRepository.existsByPostAndMemberId(post, memberId)) {
            return false;
        }

        post.addLike(memberId);

        PostLikeCount likeCount = postLikeCountRepository.findById(postId)
                .orElseGet(() -> new PostLikeCount(postId, 0L));
        likeCount.increaseLikeCount();
        postLikeCountRepository.save(likeCount);

        return true;
    }

    @Override
    @Transactional
    public boolean unlikePost(Long postId, Long memberId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchPostException("ID가 " + postId + "인 게시물이 존재하지 않습니다."));

        if (!postLikeRepository.existsByPostAndMemberId(post, memberId)) {
            return false;
        }

        post.removeLike(memberId);

        PostLikeCount likeCount = postLikeCountRepository.findById(postId)
                .orElseGet(() -> new PostLikeCount(postId, 0L));
        likeCount.decreaseLikeCount();
        postLikeCountRepository.save(likeCount);

        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isPostLikedByMember(Long postId, Long memberId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchPostException("ID가 " + postId + "인 게시물이 존재하지 않습니다."));

        return postLikeRepository.existsByPostAndMemberId(post, memberId);
    }

    @Override
    @Transactional(readOnly = true)
    public int getPostLikeCount(Long postId) {
        return postLikeCountRepository.findById(postId)
                .map(PostLikeCount::getLikeCount)
                .map(Long::intValue)
                .orElse(0);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SearchPostResult> getLikedPostsByMember(SearchPostCommand command) {
        return postQueryPort.searchPostsLikedByMember(command);
    }
}
