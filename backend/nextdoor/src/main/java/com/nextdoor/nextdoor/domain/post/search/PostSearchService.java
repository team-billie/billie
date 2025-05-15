package com.nextdoor.nextdoor.domain.post.search;

import com.nextdoor.nextdoor.domain.post.controller.dto.PostSearchResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PostSearchService {

    private final PostSearchRepository postSearchRepository;

    public Page<PostSearchResponseDto> searchPostsByKeywordInAddress(String keyword, String address, Pageable pageable) {
        Page<PostDocument> posts = postSearchRepository.searchByKeywordWithAddress(keyword, address, pageable);

        return posts.map(PostSearchResponseDto::from);
    }
}