package com.nextdoor.nextdoor.domain.aianalysis.service.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@Getter
public class ImageMatcherResponseDto {

    private List<String> before;
    private List<String> after;
}
