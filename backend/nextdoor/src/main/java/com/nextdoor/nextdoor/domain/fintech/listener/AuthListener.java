package com.nextdoor.nextdoor.domain.fintech.listener;

import com.nextdoor.nextdoor.domain.auth.event.OAuth2UserCreatedEvent;
import com.nextdoor.nextdoor.domain.fintech.service.FintechUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class AuthListener {

    private FintechUserService fintechUserService;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional
    public void handleOAuth2UserCreatedEvent(OAuth2UserCreatedEvent event) {
        fintechUserService.createUser(event.getMemberId(), event.getEmail());
    }
}
