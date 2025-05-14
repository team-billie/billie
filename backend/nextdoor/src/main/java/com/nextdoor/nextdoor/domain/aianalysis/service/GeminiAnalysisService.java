package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.google.cloud.vertexai.api.Content;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.Part;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.InspectDamageRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.InspectDamageResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.event.out.AiAnalysisCompletedEvent;
import com.nextdoor.nextdoor.domain.aianalysis.exception.DamageAnalysisPresentException;
import com.nextdoor.nextdoor.domain.aianalysis.exception.ExternalApiException;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisRentalQueryPort;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GeminiAnalysisService implements AiAnalysisService {

    private final ApplicationEventPublisher eventPublisher;

    private final GenerativeModel generativeModel;
    private final Part promptPart;

    private final AiAnalysisRentalQueryPort aiAnalysisRentalQueryPort;

    @Override
    @Transactional(readOnly = true)
    public InspectDamageResponseDto inspectDamage(Long loginUserId, InspectDamageRequestDto inspectDamageRequestDto) {
        RentalDto rental = aiAnalysisRentalQueryPort.findById(inspectDamageRequestDto.getRentalId());
        if (rental.getDamageAnalysis() != null) {
            throw new DamageAnalysisPresentException("이미 분석 결과가 존재합니다.");
        }
        List<RentalDto.AiImageDto> aiImages = rental.getAiImages(); //ai image 존재 여부 검증
        GenerateContentResponse response;
        try {
            response = generativeModel.generateContent(createContent(aiImages));
        } catch (IOException e) {
            throw new ExternalApiException(e);
        }
        String damageAnalysis = response.getCandidates(0).getContent().getParts(0).getText();
        eventPublisher.publishEvent(new AiAnalysisCompletedEvent(inspectDamageRequestDto.getRentalId(), damageAnalysis));
        return new InspectDamageResponseDto(damageAnalysis);
    }

    private Content createContent(List<RentalDto.AiImageDto> aiImages) {
        List<Part> beforeImageParts = aiImages.stream()
                .filter(aiImageDto -> aiImageDto.getType().equals(RentalDto.AiImageDto.Type.BEFORE))
                .map(aiImageDto -> PartMaker.fromMimeTypeAndData(aiImageDto.getMimeType(), aiImageDto.getImageUrl()))
                .toList();
        List<Part> afterImageParts = aiImages.stream()
                .filter(aiImageDto -> aiImageDto.getType().equals(RentalDto.AiImageDto.Type.AFTER))
                .map(aiImageDto -> PartMaker.fromMimeTypeAndData(aiImageDto.getMimeType(), aiImageDto.getImageUrl()))
                .toList();
        return Content.newBuilder()
                .addAllParts(beforeImageParts)
                .addParts(Part.newBuilder().setText("These are before images.").build())
                .addAllParts(afterImageParts)
                .addParts(Part.newBuilder().setText("These are after images.").build())
                .addParts(promptPart)
                .setRole("user")
                .build();
    }
}
