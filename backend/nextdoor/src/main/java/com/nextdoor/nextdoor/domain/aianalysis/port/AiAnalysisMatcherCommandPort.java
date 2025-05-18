package com.nextdoor.nextdoor.domain.aianalysis.port;

import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherResponseDto;

public interface AiAnalysisMatcherCommandPort {

    ImageMatcherResponseDto match(ImageMatcherRequestDto request);
}
