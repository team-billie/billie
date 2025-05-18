package com.nextdoor.nextdoor.command;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisMatcherCommandPort;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherResponseDto;

@Adapter
public class AiAnalysisMatcherCommandAdapter implements AiAnalysisMatcherCommandPort {

    @Override
    public ImageMatcherResponseDto match(ImageMatcherRequestDto request) {
        return null;
    }
}
