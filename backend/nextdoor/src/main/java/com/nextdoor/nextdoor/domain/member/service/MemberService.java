package com.nextdoor.nextdoor.domain.member.service;

import com.nextdoor.nextdoor.domain.member.dto.MemberSaveDto;

public interface MemberService {

    void createMember(MemberSaveDto memberSaveDto);
}
