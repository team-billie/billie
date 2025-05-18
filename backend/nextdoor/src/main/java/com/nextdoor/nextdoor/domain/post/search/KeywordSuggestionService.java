package com.nextdoor.nextdoor.domain.post.search;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class KeywordSuggestionService {

    private final RedisTemplate<String, String> redisTemplate;
    private static final String KEY_PREFIX = "search:keywords:";
    private static final int MAX_SUGGESTIONS = 4;
    private static final double INITIAL_SCORE = 1.0;
    private static final double SCORE_INCREMENT = 1.0;

    public void saveSearchKeyword(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return;
        }
        
        String normalizedKeyword = keyword.trim().toLowerCase();
        String key = KEY_PREFIX + "all";
        
        Double currentScore = redisTemplate.opsForZSet().score(key, normalizedKeyword);
        if (currentScore == null) {
            redisTemplate.opsForZSet().add(key, normalizedKeyword, INITIAL_SCORE);
        } else {
            redisTemplate.opsForZSet().incrementScore(key, normalizedKeyword, SCORE_INCREMENT);
        }
    }

    public List<String> suggestKeywords(String prefix) {
        if (prefix == null || prefix.isBlank()) {
            return getTopKeywords();
        }
        
        String normalizedPrefix = prefix.trim().toLowerCase();
        String key = KEY_PREFIX + "all";
        
        Set<ZSetOperations.TypedTuple<String>> allKeywords =
                redisTemplate.opsForZSet().reverseRangeWithScores(key, 0, -1);
        
        if (allKeywords == null || allKeywords.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<String> suggestions = allKeywords.stream()
                .map(ZSetOperations.TypedTuple::getValue)
                .filter(keyword -> keyword != null && keyword.startsWith(normalizedPrefix))
                .limit(MAX_SUGGESTIONS)
                .toList();

        return suggestions;
    }

    public List<String> getTopKeywords() {
        String key = KEY_PREFIX + "all";
        
        Set<String> topKeywords = redisTemplate.opsForZSet().reverseRange(key, 0, MAX_SUGGESTIONS - 1);
        
        if (topKeywords == null) {
            return new ArrayList<>();
        }
        
        return new ArrayList<>(topKeywords);
    }
}