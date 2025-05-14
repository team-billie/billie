package com.nextdoor.nextdoor.domain.auth.port;

import reactor.core.publisher.Mono;

import java.util.Map;

public interface AuthFintechCommandPort {

    Mono<Map<String, Object>> createUser(Long userId, String ssafyApiEmail);
}
