package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import com.nextdoor.nextdoor.domain.aianalysis.event.out.AiCompareAnalysisCompletedEvent;
import com.nextdoor.nextdoor.domain.aianalysis.exception.ExternalApiException;
import com.nextdoor.nextdoor.domain.aianalysis.exception.GeminiResponseProcessingException;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisMatcherCommandPort;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisRentalQueryPort;
import com.nextdoor.nextdoor.domain.aianalysis.port.GeminiComparatorAsyncPort;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.ImageMatcherResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@Transactional
public class GeminiAnalysisService implements AiAnalysisService {

    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher eventPublisher;

    private final GenerativeModel geminiAnalysisModel;
    private final Part damageAnalyzerPromptPart;
    private final Part overallDamageComparatorPromptPart;
    private final Part pairDamageComparatorPromptPart;

    private final AiAnalysisRentalQueryPort aiAnalysisRentalQueryPort;
    private final AiAnalysisMatcherCommandPort aiAnalysisMatcherCommandPort;
    private final GeminiComparatorAsyncPort geminiComparatorAsyncPort;

    @Autowired
    public GeminiAnalysisService(
            ObjectMapper objectMapper,
            ApplicationEventPublisher eventPublisher,
            @Qualifier("geminiFlash")
            GenerativeModel geminiAnalysisModel,
            @Qualifier("damageAnalyzerPromptPart")
            Part damageAnalyzerPromptPart,
            @Qualifier("overallDamageComparatorPromptPart")
            Part overallDamageComparatorPromptPart,
            @Qualifier("pairDamageComparatorPromptPart")
            Part pairDamageComparatorPromptPart,
            AiAnalysisRentalQueryPort aiAnalysisRentalQueryPort,
            AiAnalysisMatcherCommandPort aiAnalysisMatcherCommandPort,
            GeminiComparatorAsyncPort geminiComparatorAsyncPort
    ) {
        this.objectMapper = objectMapper;
        this.eventPublisher = eventPublisher;
        this.geminiAnalysisModel = geminiAnalysisModel;
        this.damageAnalyzerPromptPart = damageAnalyzerPromptPart;
        this.overallDamageComparatorPromptPart = overallDamageComparatorPromptPart;
        this.pairDamageComparatorPromptPart = pairDamageComparatorPromptPart;
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
                .map(this::convertToImagePart)
                .toList();
        return Content.newBuilder()
                .addParts(damageAnalyzerPromptPart)
                .addAllParts(imageParts)
                .setRole("user")
                .build();
    }

    @Override
    public DamageComparisonResponseDto compareDamage(Long loginUserId, DamageComparisonRequestDto inspectDamageRequestDto) {
        RentalDto rental = aiAnalysisRentalQueryPort.findById(inspectDamageRequestDto.getRentalId());
        // if (rental.getDamageAnalysis() != null) {
        //     throw new DamageAnalysisPresentException("이미 분석 결과가 존재합니다.");
        // }

        // 전 후 이미지 분리
        List<RentalDto.AiImageDto> beforeAiImages = rental.getAiImages().stream()
                .filter(aiImageDto -> aiImageDto.getType().equals(AiImageType.BEFORE)).toList();
        List<RentalDto.AiImageDto> afterAiImages = rental.getAiImages().stream()
                .filter(aiImageDto -> aiImageDto.getType().equals(AiImageType.AFTER)).toList();

        // 이미지 쌍 만들고 비교
        List<RentalDto.AiImageDto[]> aiImagePairs = matchImages(beforeAiImages, afterAiImages);
        List<String> geminiResponses = compareImages(beforeAiImages, afterAiImages, aiImagePairs);
        String overallResponse;
        try {
            Map<String, String> overallGeminiResponse = objectMapper.readValue(geminiResponses.getFirst(), new TypeReference<>() {});
            overallResponse = switch (overallGeminiResponse.get("result")) {
                case "DAMAGE_FOUND" -> overallGeminiResponse.get("details");
                case "NO_DAMAGE_FOUND" -> null;
                default -> null;
            };
        } catch (JsonProcessingException e) {
            throw new GeminiResponseProcessingException("Gemini 응답 변환 도중 예외 발생: " + geminiResponses.getFirst(), e);
        }
        List<String> pairResponses = geminiResponses.subList(1, geminiResponses.size());

        // 프론트로 전할 API 응답 및 이벤트 요소 생성
        List<DamageComparisonResponseDto.MatchingResult> responseMatchingResults = new ArrayList<>();
        List<AiCompareAnalysisCompletedEvent.MatchingResult> eventMatchingResults = new ArrayList<>();
        for (int i = 0; i < pairResponses.size(); i++) {
            try {
                responseMatchingResults.add(new DamageComparisonResponseDto.MatchingResult(
                        aiImagePairs.get(i)[0].getImageUrl(),
                        aiImagePairs.get(i)[1].getImageUrl(),
                        objectMapper.readValue(pairResponses.get(i), DamageComparisonResponseDto.MatchingResult.PairComparisonResult.class)
                ));
            } catch (JsonProcessingException e) {
                throw new GeminiResponseProcessingException("Gemini 응답 변환 도중 예외 발생: " + pairResponses.get(i), e);
            }
            eventMatchingResults.add(new AiCompareAnalysisCompletedEvent.MatchingResult(
                    aiImagePairs.get(i)[0].getAiImageId(),
                    aiImagePairs.get(i)[1].getAiImageId(),
                    pairResponses.get(i)
            ));
        }

        // 이벤트 발행 및 API 응답 리턴
        eventPublisher.publishEvent(new AiCompareAnalysisCompletedEvent(
                inspectDamageRequestDto.getRentalId(),
                overallResponse,
                eventMatchingResults
        ));
        return new DamageComparisonResponseDto(
                beforeAiImages.stream().map(RentalDto.AiImageDto::getImageUrl).toList(),
                afterAiImages.stream().map(RentalDto.AiImageDto::getImageUrl).toList(),
                overallResponse,
                responseMatchingResults);
    }

    private List<RentalDto.AiImageDto[]> matchImages(List<RentalDto.AiImageDto> beforeAiImages, List<RentalDto.AiImageDto> afterAiImages) {
        ImageMatcherResponseDto matcherResponse = aiAnalysisMatcherCommandPort.match(
                new ImageMatcherRequestDto(
                        beforeAiImages.stream().map(RentalDto.AiImageDto::getImageUrl).toList(),
                        afterAiImages.stream().map(RentalDto.AiImageDto::getImageUrl).toList()
                ));
        return matcherResponse.getMatches().stream()
                .map(match -> new RentalDto.AiImageDto[] {
                        beforeAiImages.get(match.getBeforeIndex()),
                        afterAiImages.get(match.getAfterIndex())
                }).toList();
    }

    private List<String> compareImages(
            List<RentalDto.AiImageDto> beforeAiImages,
            List<RentalDto.AiImageDto> afterAiImages,
            List<RentalDto.AiImageDto[]> aiImagePairs
    ) {
        List<CompletableFuture<GenerateContentResponse>> futures = new ArrayList<>();
        futures.add(geminiComparatorAsyncPort.generateContent(createOverallComparisonContent(beforeAiImages, afterAiImages)));
        aiImagePairs.forEach(aiImagePair -> futures.add(geminiComparatorAsyncPort.generateContent(createPairComparisonContent(aiImagePair[0], aiImagePair[1]))));
        return futures.stream()
                .map(CompletableFuture::join)
                .map(response ->
                        cleanMarkdownCodeBlocks(response.getCandidates(0).getContent().getParts(0).getText()))
                .toList();
    }

    private Content createOverallComparisonContent(
            List<RentalDto.AiImageDto> beforeAiImages,
            List<RentalDto.AiImageDto> afterAiImages
    ) {
        return Content.newBuilder()
                .addParts(overallDamageComparatorPromptPart)
                .addParts(Part.newBuilder().setText("These are before images.").build())
                .addAllParts(beforeAiImages.stream()
                        .filter(aiImageDto -> aiImageDto.getType().equals(AiImageType.BEFORE))
                        .map(this::convertToImagePart)
                        .toList())
                .addParts(Part.newBuilder().setText("These are after images.").build())
                .addAllParts(afterAiImages.stream()
                        .filter(aiImageDto -> aiImageDto.getType().equals(AiImageType.BEFORE))
                        .map(this::convertToImagePart)
                        .toList())
                .setRole("user")
                .build();
    }

    private Content createPairComparisonContent(RentalDto.AiImageDto beforeAiImage, RentalDto.AiImageDto afterAiImage) {
        return Content.newBuilder()
                .addParts(pairDamageComparatorPromptPart)
                .addParts(convertToImagePart(beforeAiImage))
                .addParts(Part.newBuilder().setText("This is a before image.").build())
                .addParts(convertToImagePart(afterAiImage))
                .addParts(Part.newBuilder().setText("This is an after image.").build())
                .setRole("user")
                .build();
    }

    private Part convertToImagePart(RentalDto.AiImageDto aiImageDto) {
        return PartMaker.fromMimeTypeAndData(aiImageDto.getMimeType(), aiImageDto.getImageUrl());
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
