package com.nextdoor.nextdoor.domain.member.domain;

import com.nextdoor.nextdoor.domain.member.enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends TimestampedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String birth;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String address;

    private String profileImageUrl;

    @Column(name = "account")
    private Long accountId;

    @NotNull
    private String nickname;
}
