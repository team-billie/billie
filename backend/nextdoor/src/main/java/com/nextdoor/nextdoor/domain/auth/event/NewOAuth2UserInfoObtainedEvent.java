package com.nextdoor.nextdoor.domain.auth.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class NewOAuth2UserInfoObtainedEvent {

    private String nickname;
}
