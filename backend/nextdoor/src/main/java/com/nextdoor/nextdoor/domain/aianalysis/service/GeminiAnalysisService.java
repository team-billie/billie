package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.google.cloud.vertexai.api.Content;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.Part;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.DamageAnalysisRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.DamageComparisonRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.DamageAnalysisResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.DamageComparisonResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.enums.AiImageType;
import com.nextdoor.nextdoor.domain.aianalysis.event.out.AiAnalysisCompletedEvent;
import com.nextdoor.nextdoor.domain.aianalysis.exception.ExternalApiException;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisMatcherCommandPort;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisRentalQueryPort;
import com.nextdoor.nextdoor.domain.aianalysis.port.GeminiComparatorAsyncPort;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@Transactional
public class GeminiAnalysisService implements AiAnalysisService {

    private final ApplicationEventPublisher eventPublisher;

    private final GenerativeModel geminiAnalysisModel;
    private final GenerativeModel geminiComparisonModel;
    private final Part damageAnalyzerPromptPart;
    private final Part damageComparatorPromptPart;

    private final AiAnalysisRentalQueryPort aiAnalysisRentalQueryPort;
    private final AiAnalysisMatcherCommandPort aiAnalysisMatcherCommandPort;
    private final GeminiComparatorAsyncPort geminiComparatorAsyncPort;

    public GeminiAnalysisService(
            ApplicationEventPublisher eventPublisher,
            @Qualifier("geminiFlash")
            GenerativeModel geminiAnalysisModel,
            @Qualifier("geminiPro")
            GenerativeModel geminiComparisonModel,
            @Qualifier("damageAnalyzerPromptPart")
            Part damageAnalyzerPromptPart,
            @Qualifier("damageComparatorPromptPart")
            Part damageComparatorPromptPart,
            AiAnalysisRentalQueryPort aiAnalysisRentalQueryPort,
            AiAnalysisMatcherCommandPort aiAnalysisMatcherCommandPort,
            GeminiComparatorAsyncPort geminiComparatorAsyncPort
    ) {
        this.eventPublisher = eventPublisher;
        this.geminiAnalysisModel = geminiAnalysisModel;
        this.geminiComparisonModel = geminiComparisonModel;
        this.damageAnalyzerPromptPart = damageAnalyzerPromptPart;
        this.damageComparatorPromptPart = damageComparatorPromptPart;
        this.aiAnalysisRentalQueryPort = aiAnalysisRentalQueryPort;
        this.aiAnalysisMatcherCommandPort = aiAnalysisMatcherCommandPort;
        this.geminiComparatorAsyncPort = geminiComparatorAsyncPort;
    }

    @Override
    public DamageAnalysisResponseDto analyzeDamage(Long loginUserId, DamageAnalysisRequestDto damageAnalysisRequestDto) {
        RentalDto rental = aiAnalysisRentalQueryPort.findById(damageAnalysisRequestDto.getRentalId());
        // if (rental.getDamageAnalysis() != null) {
        //     throw new DamageAnalysisPresentException("이미 분석 결과가 존재합니다.");
        // }
        List<RentalDto.AiImageDto> aiImages = rental.getAiImages();
        GenerateContentResponse response;
        try {
            response = geminiAnalysisModel.generateContent(createAnalysisContent(aiImages));
        } catch (IOException e) {
            throw new ExternalApiException(e);
        }
        String damageAnalysis = response.getCandidates(0).getContent().getParts(0).getText();
        eventPublisher.publishEvent(new AiAnalysisCompletedEvent(damageAnalysisRequestDto.getRentalId(), damageAnalysis));
        return new DamageAnalysisResponseDto(cleanMarkdownCodeBlocks(damageAnalysis));
    }

    private Content createAnalysisContent(List<RentalDto.AiImageDto> aiImages) {
        List<Part> imageParts = aiImages.stream()
                .filter(aiImageDto -> aiImageDto.getType().equals(AiImageType.BEFORE))
                .map(aiImageDto -> PartMaker.fromMimeTypeAndData(aiImageDto.getMimeType(), aiImageDto.getImageUrl()))
                .toList();
        return Content.newBuilder()
                .addParts(damageAnalyzerPromptPart)
                .addAllParts(imageParts)
//                .addParts(PartMaker.fromMimeTypeAndData("image/jpeg", ""))
                .setRole("user")
                .build();
    }

    @Override
    public DamageComparisonResponseDto compareDamage(Long loginUserId, DamageComparisonRequestDto inspectDamageRequestDto) {
        RentalDto rental = aiAnalysisRentalQueryPort.findById(inspectDamageRequestDto.getRentalId());
        // if (rental.getDamageAnalysis() != null) {
        //     throw new DamageAnalysisPresentException("이미 분석 결과가 존재합니다.");
        // }
        List<RentalDto.AiImageDto> aiImages = rental.getAiImages(); //ai image 존재 여부 검증
        List<RentalDto.AiImageDto> beforeAiImages = rental.getAiImages().stream()
                .filter(aiImageDto -> aiImageDto.getType().equals(AiImageType.BEFORE))
                .toList();
        List<RentalDto.AiImageDto> afterAiImages = rental.getAiImages().stream()
                .filter(aiImageDto -> aiImageDto.getType().equals(AiImageType.AFTER))
                .toList();
        ImageMatcherResponseDto imageMatcherResponseDto = aiAnalysisMatcherCommandPort.match(
                new ImageMatcherRequestDto(
                        beforeAiImages.stream().map(RentalDto.AiImageDto::getImageUrl).toList(),
                        afterAiImages.stream().map(RentalDto.AiImageDto::getImageUrl).toList()
                ));
        log.info("imageMatcherResponseDto: {}", imageMatcherResponseDto);
        List<RentalDto.AiImageDto[]> aiImagePairs = imageMatcherResponseDto.getMatches().stream().map(match -> {
            RentalDto.AiImageDto[] aiImagePair = new RentalDto.AiImageDto[2];
            aiImagePair[0] = beforeAiImages.get(match.getBeforeIndex());
            aiImagePair[1] = afterAiImages.get(match.getAfterIndex());
            log.info("aiImagePair[0]: {}", aiImagePair[0]);
            log.info("aiImagePair[1]: {}", aiImagePair[1]);
            return aiImagePair;
        }).toList();
        List<CompletableFuture<GenerateContentResponse>> futures = new ArrayList<>();
        aiImagePairs.forEach(aiImagePair -> futures.add(geminiComparatorAsyncPort.generateContent(createComparisonContent(aiImagePair[0], aiImagePair[1]))));
        List<GenerateContentResponse> responses = futures.stream()
                .map(CompletableFuture::join)
                .toList();
        List<String> damageAnalysisResults = responses.stream()
                .map(response ->
                        cleanMarkdownCodeBlocks(response.getCandidates(0).getContent().getParts(0).getText()))
                .toList();
//        eventPublisher.publishEvent(new AiCompareAnalysisCompletedEvent(inspectDamageRequestDto.getRentalId(), damageAnalysisResults));
        return new DamageComparisonResponseDto(damageAnalysisResults);
    }

    private Content createComparisonContent(RentalDto.AiImageDto beforeAiImage, RentalDto.AiImageDto afterAiImage) {
        return Content.newBuilder()
                .addParts(damageComparatorPromptPart)
                .addParts(PartMaker.fromMimeTypeAndData(beforeAiImage.getMimeType(), beforeAiImage.getImageUrl()))
                .addParts(Part.newBuilder().setText("This is before images.").build())
                .addParts(PartMaker.fromMimeTypeAndData(afterAiImage.getMimeType(), afterAiImage.getImageUrl()))
                .addParts(Part.newBuilder().setText("This is after images.").build())
                .setRole("user")
                .build();
    }

    private String cleanMarkdownCodeBlocks(String text) {
        Pattern pattern = Pattern.compile("```(?:json)?\\s*\\n?(.*?)\\n?```", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return text.trim();
    }
}
