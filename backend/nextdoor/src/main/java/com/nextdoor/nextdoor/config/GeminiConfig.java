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

    @Value("${custom.google.ai.gemini.model}")
    private String geminiModel;

    @Value("${custom.google.ai.gemini.location}")
    private String geminiLocation;

    @Value("${custom.google.ai.gemini.project-id}")
    private String geminiProjectId;

    @Value("${custom.damage-analyzer-prompt-location}")
    private String damageAnalyzerPromptLocation;

    @Value("${custom.damage-comparator-prompt-location}")
    private String damageComparatorPromptLocation;

    @Bean
    public VertexAI vertexAI() {
        return new VertexAI(geminiProjectId, geminiLocation);
    }

    @Bean
    public GenerativeModel generativeModel(VertexAI vertexAI) {
        return new GenerativeModel(geminiModel, vertexAI);
    }

    @Bean(name = "damageAnalyzerPromptPart")
    public Part afterImageDamageAnalyzerPromptPart(ResourceLoader resourceLoader) {
        return loadPromptPart(resourceLoader, damageAnalyzerPromptLocation);
    }

    @Bean(name = "damageComparatorPromptPart")
    public Part imageComparisonDamageAnalyzerPromptPart(ResourceLoader resourceLoader) {
        return loadPromptPart(resourceLoader, damageComparatorPromptLocation);
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
