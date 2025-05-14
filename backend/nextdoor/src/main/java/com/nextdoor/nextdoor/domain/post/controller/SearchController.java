package com.nextdoor.nextdoor.domain.post.controller;

import com.nextdoor.nextdoor.domain.post.search.PostDocument;
import com.nextdoor.nextdoor.domain.post.controller.dto.PostSearchResponseDto;
import com.nextdoor.nextdoor.domain.post.controller.dto.SearchRequestDto;
import com.nextdoor.nextdoor.domain.post.domain.Category;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
@Validated
public class SearchController {
  private final ElasticsearchOperations elasticsearchOperations;

  @GetMapping("/search")
  public Page<PostSearchResponseDto> search(
          @Validated SearchRequestDto request
  ) {
    try {
      Criteria criteria = new Criteria();
      List<Criteria> mustCriteria = new ArrayList<>();

      if (request.getKeyword() != null && !request.getKeyword().isBlank()) {
        Criteria keywordCriteria = new Criteria("title").matches(request.getKeyword())
                .or("content").matches(request.getKeyword())
                .or("address").matches(request.getKeyword());
        mustCriteria.add(keywordCriteria);
      }

      if (request.getCategoryList() != null && !request.getCategoryList().isEmpty()) {
        List<String> categoryNames = request.getCategoryList().stream()
                .map(Category::name)
                .collect(Collectors.toList());

        Criteria categoryCriteria = new Criteria("category").in(categoryNames);
        mustCriteria.add(categoryCriteria);
      }

      if (request.getLocationList() != null && !request.getLocationList().isEmpty()) {
        Criteria locationCriteria = new Criteria("address").in(request.getLocationList());
        mustCriteria.add(locationCriteria);
      }

      if (request.getMinPrice() != null || request.getMaxPrice() != null) {
        Criteria priceCriteria = new Criteria("rentalFee");

        if (request.getMinPrice() != null) {
          priceCriteria = priceCriteria.greaterThanEqual(request.getMinPrice());
        }

        if (request.getMaxPrice() != null) {
          priceCriteria = priceCriteria.lessThanEqual(request.getMaxPrice());
        }

        mustCriteria.add(priceCriteria);
      }

      if (request.getStartDate() != null || request.getEndDate() != null) {
        Criteria dateCriteria = new Criteria("createdAt");

        if (request.getStartDate() != null) {
          Date startDate = Date.from(request.getStartDate().atStartOfDay(ZoneId.systemDefault()).toInstant());
          dateCriteria = dateCriteria.greaterThanEqual(startDate);
        }

        if (request.getEndDate() != null) {
          Date endDate = Date.from(request.getEndDate().plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
          dateCriteria = dateCriteria.lessThan(endDate);
        }

        mustCriteria.add(dateCriteria);
      }

      for (Criteria c : mustCriteria) {
        criteria = criteria.and(c);
      }

      Sort.Direction direction = "ASC".equalsIgnoreCase(request.getSortDirection()) 
          ? Sort.Direction.ASC 
          : Sort.Direction.DESC;

      Sort sort;
      switch (request.getSort()) {
        case "likeCount":
          sort = Sort.by(direction, "likeCount");
          break;
        case "rentalFee":
          sort = Sort.by(direction, "rentalFee");
          break;
        default:
          sort = Sort.by(direction, "createdAt");
      }

      Pageable pageable = PageRequest.of(
              request.getPage(),
              request.getSize(),
              sort
      );

      CriteriaQuery query = new CriteriaQuery(criteria)
              .setPageable(pageable);

      SearchHits<PostDocument> hits = elasticsearchOperations.search(query, PostDocument.class);

      List<PostSearchResponseDto> results = hits.getSearchHits().stream()
              .map(SearchHit::getContent)
              .map(PostSearchResponseDto::from)
              .collect(Collectors.toList());

      return new PageImpl<>(
              results,
              pageable,
              hits.getTotalHits()
      );
    } catch (Exception e) {
      log.error("검색 오류: {}", e.getMessage(), e);
      return Page.empty();
    }
  }
}
