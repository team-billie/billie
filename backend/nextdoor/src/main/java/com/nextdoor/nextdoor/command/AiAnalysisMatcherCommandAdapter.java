package com.nextdoor.nextdoor.command;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisMatcherCommandPort;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Adapter
public class AiAnalysisMatcherCommandAdapter implements AiAnalysisMatcherCommandPort {

    private final RestTemplate restTemplate;

    @Override
    public ImageMatcherResponseDto match(ImageMatcherRequestDto request) {
        return restTemplate.postForObject("http://k12e205.p.ssafy.io/match", request, ImageMatcherResponseDto.class);
    }
}
