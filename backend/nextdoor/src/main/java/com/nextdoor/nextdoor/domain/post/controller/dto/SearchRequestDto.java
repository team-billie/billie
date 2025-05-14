package com.nextdoor.nextdoor.domain.post.controller.dto;

import com.nextdoor.nextdoor.domain.post.domain.Category;
import lombok.*;
import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchRequestDto {

    private String keyword;

    private List<Category> categoryList;

    private List<String> locationList;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate startDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate endDate;

    private Long minPrice;

    private Long maxPrice;

    @Min(0)
    @Builder.Default
    private int page = 0;

    @Min(1) @Max(100)
    @Builder.Default
    private int size = 10;

    @Pattern(regexp = "^(createdAt|likeCount|rentalFee)$")
    @Builder.Default
    private String sort = "createdAt";

    @Builder.Default
    private String sortDirection = "DESC";
}
