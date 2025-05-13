package com.nextdoor.nextdoor.domain.member.service;

import com.nextdoor.nextdoor.domain.member.controller.dto.request.MemberExtraInfoSaveRequestDto;
import com.nextdoor.nextdoor.domain.member.controller.dto.response.MemberResponseDto;

public interface MemberService {

    MemberResponseDto updateMember(Long memberId, MemberExtraInfoSaveRequestDto memberDto);

    MemberResponseDto retrieveMember(Long memberId);
}
