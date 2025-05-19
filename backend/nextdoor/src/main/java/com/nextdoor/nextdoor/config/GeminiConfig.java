package com.nextdoor.nextdoor.config;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.Part;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class GeminiConfig {

    @Value("${custom.google.ai.gemini.model.flash}")
    private String geminiFlash;

    @Value("${custom.google.ai.gemini.model.pro}")
    private String geminiPro;

    @Value("${custom.google.ai.gemini.location}")
    private String geminiLocation;

    @Value("${custom.google.ai.gemini.project-id}")
    private String geminiProjectId;

    @Value("${custom.damage-analyzer-prompt-location}")
    private String damageAnalyzerPromptLocation;

    @Value("${custom.overall-damage-comparator-prompt-location}")
    private String overallDamageComparatorPromptLocation;

    @Value("${custom.pair-damage-comparator-prompt-location}")
    private String pairDamageComparatorPromptLocation;

    @Value("${custom.product-analyzer-prompt-location}")
    private String productAnalyzerPromptLocation;

    @Bean
    public VertexAI vertexAI() {
        return new VertexAI(geminiProjectId, geminiLocation);
    }

    @Bean(name = "geminiFlash")
    public GenerativeModel geminiAnalysisModel(VertexAI vertexAI) {
        return new GenerativeModel(geminiFlash, vertexAI);
    }

    @Bean(name = "geminiPro")
    public GenerativeModel geminiComparisonModel(VertexAI vertexAI) {
        return new GenerativeModel(geminiPro, vertexAI);
    }

    @Bean(name = "damageAnalyzerPromptPart")
    public Part damageAnalyzerPromptPart(ResourceLoader resourceLoader) {
        return loadPromptPart(resourceLoader, damageAnalyzerPromptLocation);
    }

    @Bean(name = "overallDamageComparatorPromptPart")
    public Part overallDamageComparatorPromptPart(ResourceLoader resourceLoader) {
        return loadPromptPart(resourceLoader, overallDamageComparatorPromptLocation);
    }

    @Bean(name = "pairDamageComparatorPromptPart")
    public Part pairDamageComparatorPromptPart(ResourceLoader resourceLoader) {
        return loadPromptPart(resourceLoader, pairDamageComparatorPromptLocation);
    }

    @Bean(name = "productAnalyzerPromptPart")
    public Part productAnalyzerPromptPart(ResourceLoader resourceLoader) {
        return loadPromptPart(resourceLoader, productAnalyzerPromptLocation);
    }

    private Part loadPromptPart(ResourceLoader resourceLoader, String location) {
        Resource resource = resourceLoader.getResource("classpath:" + location);
        try {
            String prompt = resource.getContentAsString(StandardCharsets.UTF_8);
            return Part.newBuilder().setText(prompt).build();
        } catch (IOException e) {
            throw new IllegalStateException("Failed to load prompt from " + location, e);
        }
    }
}
