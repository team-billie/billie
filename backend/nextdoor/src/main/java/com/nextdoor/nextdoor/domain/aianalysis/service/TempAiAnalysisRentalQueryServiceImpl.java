package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.nextdoor.nextdoor.domain.aianalysis.service.dto.AiImageDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TempAiAnalysisRentalQueryServiceImpl implements AiAnalysisRentalQueryService {

    @Override
    public List<AiImageDto> findByRentalId(Long id) {
        return List.of(
                AiImageDto.builder()
                        .rentalId(id)
                        .aiImageId(1L)
                        .imageUrl("https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250501_174258140.jpg")
                        .mimeType("image/jpeg")
                        .type(AiImageDto.Type.BEFORE)
                        .build(),
                AiImageDto.builder()
                        .rentalId(id)
                        .aiImageId(2L)
                        .imageUrl("https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250501_174258140_01.jpg")
                        .mimeType("image/jpeg")
                        .type(AiImageDto.Type.AFTER)
                        .build()
        );
    }
}
