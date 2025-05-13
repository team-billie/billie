package com.nextdoor.nextdoor.domain.member.controller.dto.response;

import com.nextdoor.nextdoor.domain.member.domain.Member;
import com.nextdoor.nextdoor.domain.member.enums.Gender;
import lombok.Getter;

@Getter
public class MemberResponseDto {

    private Long id;
    private String email;
    private String birth;
    private Gender gender;
    private String address;
    private String profileImageUrl;
    private Long accountId;
    private String nickname;
    private String authProvider;

    public static MemberResponseDto from(Member member) {
        MemberResponseDto dto = new MemberResponseDto();
        dto.id = member.getId();
        dto.email = member.getEmail();
        dto.birth = member.getBirth();
        dto.gender = member.getGender();
        dto.address = member.getAddress();
        dto.profileImageUrl = member.getProfileImageUrl();
        dto.accountId = member.getAccountId();
        dto.nickname = member.getNickname();
        dto.authProvider = member.getAuthProvider();
        return dto;
    }
}
