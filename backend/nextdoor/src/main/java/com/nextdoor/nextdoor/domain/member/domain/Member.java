package com.nextdoor.nextdoor.domain.member.domain;

import com.nextdoor.nextdoor.domain.member.enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Member extends TimestampedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @UuidGenerator
    private String uuid;

    @NotNull
    private String email;

    private String birth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String address;

    private String profileImageUrl;

    @Column(name = "account")
    private Long accountId;

    @NotNull
    private String nickname;

    private String authProvider;

    public void updateBirth(String birth) {
        this.birth = birth;
    }

    public void updateGender(Gender gender) {
        this.gender = gender;
    }

    public void updateAddress(String address) {
        this.address = address;
    }

    public void updateAccountId(Long accountId) {
        this.accountId = accountId;
    }
}
