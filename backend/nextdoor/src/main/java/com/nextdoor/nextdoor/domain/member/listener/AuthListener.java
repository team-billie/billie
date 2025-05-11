package com.nextdoor.nextdoor.domain.member.listener;

import com.nextdoor.nextdoor.domain.auth.event.NewOAuth2UserInfoObtainedEvent;
import com.nextdoor.nextdoor.domain.member.dto.MemberSaveDto;
import com.nextdoor.nextdoor.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AuthListener {

    private final MemberService memberService;

    @Async("asyncExecutor")
    @EventListener
    public void handleNewUserInfoObtainedEvent(NewOAuth2UserInfoObtainedEvent event) {
        memberService.createMember(new MemberSaveDto(event.getNickname()));
    }
}
