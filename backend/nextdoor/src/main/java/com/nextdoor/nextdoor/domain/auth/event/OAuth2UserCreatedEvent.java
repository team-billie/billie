package com.nextdoor.nextdoor.domain.auth.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class OAuth2UserCreatedEvent {

    private Long memberId;
    private String email;
}
