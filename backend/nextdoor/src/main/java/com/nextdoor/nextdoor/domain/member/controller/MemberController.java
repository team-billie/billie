package com.nextdoor.nextdoor.domain.member.controller;

import com.nextdoor.nextdoor.domain.member.controller.dto.request.MemberExtraInfoSaveRequestDto;
import com.nextdoor.nextdoor.domain.member.controller.dto.response.MemberResponseDto;
import com.nextdoor.nextdoor.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @PutMapping("/")
    public ResponseEntity<MemberResponseDto> updateMember(
            @AuthenticationPrincipal Long memberId,
            @RequestBody MemberExtraInfoSaveRequestDto member) {
        return ResponseEntity.ok(memberService.updateMember(memberId, member));
    }
}
