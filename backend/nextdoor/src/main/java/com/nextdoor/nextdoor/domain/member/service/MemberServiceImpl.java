package com.nextdoor.nextdoor.domain.member.service;

import com.nextdoor.nextdoor.domain.member.dto.MemberSaveDto;
import com.nextdoor.nextdoor.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public void createMember(MemberSaveDto memberSaveDto) {
        memberRepository.save()
    }
}
