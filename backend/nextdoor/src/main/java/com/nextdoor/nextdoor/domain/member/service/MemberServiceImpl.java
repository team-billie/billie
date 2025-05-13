package com.nextdoor.nextdoor.domain.member.service;

import com.nextdoor.nextdoor.domain.member.domain.Member;
import com.nextdoor.nextdoor.domain.member.dto.MemberSaveDto;
import com.nextdoor.nextdoor.domain.member.enums.Gender;
import com.nextdoor.nextdoor.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public void createMember(MemberSaveDto memberSaveDto) {
        memberRepository.save(Member.builder()
                .authProvider(memberSaveDto.getAuthProvider())
                .nickname(memberSaveDto.getNickname())
                .email(memberSaveDto.getEmail())
                .build());
    }
}
