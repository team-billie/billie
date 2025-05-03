package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TempAiAnalysisRentalQueryServiceImpl implements AiAnalysisRentalQueryService {

    @Override
    public RentalDto findById(Long id) {
        List<RentalDto.AiImageDto> aiImages = List.of(
                RentalDto.AiImageDto.builder()
                        .rentalId(id)
                        .aiImageId(1L)
                        .imageUrl("https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250501_174258140.jpg")
                        .mimeType("image/jpeg")
                        .type(RentalDto.AiImageDto.Type.BEFORE)
                        .build(),
                RentalDto.AiImageDto.builder()
                        .rentalId(id)
                        .aiImageId(2L)
                        .imageUrl("https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250501_174258140_01.jpg")
                        .mimeType("image/jpeg")
                        .type(RentalDto.AiImageDto.Type.AFTER)
                        .build()
        );
        return RentalDto.builder()
                .rentalId(id)
                .reservationId(1L)
                .rentalStatus("RETURNED")
                .damageAnalysis(null)
                .aiImages(aiImages)
                .build();
    }
}
