package com.nextdoor.nextdoor.domain.aianalysis.port;

import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherRequestDto;

public interface AiAnalysisMatcherCommandPort {

    ImageMatcherResponseDto match(ImageMatcherRequestDto request);
}
