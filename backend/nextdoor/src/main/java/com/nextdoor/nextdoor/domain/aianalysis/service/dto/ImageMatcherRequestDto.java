package com.nextdoor.nextdoor.domain.aianalysis.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ImageMatcherRequestDto {

    private List<String> before;
    private List<String> after;
}
