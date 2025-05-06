package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FintechUserService {
    private final SsafyApiClient client;
    private final FintechUserRepository repo;

    // 계정 생성
    public Mono<FintechUser> createUser(String apiKey, String email) {
        return client.createUser(apiKey, email)
                // userKey를 받아서 JPA 저장 → Mono<FintechUser> 반환
                .map(userKey -> {
                    FintechUser u = new FintechUser(userKey, email, LocalDateTime.now());
                    return repo.save(u);
                });
    }
}