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

    /** 웹소켓 고유 식별자 **/
    @UuidGenerator
    private String uuid;

    /** 핀테크 외부 시스템(user_key) 식별자 **/
    @Column(name = "user_key", length = 36)
    private String userKey;

    @NotNull
    private String email;

    private String birth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String address;

    private String profileImageUrl;

//    @Column(name = "account")
//    private Long accountId;

    @NotNull
    private String nickname;

    private String authProvider;

    /** 안심비밀번호 6자리 **/
    @Column(name = "secure_password", length = 6)
    private String securePassword;

    public void updateBirth(String birth) {
        this.birth = birth;
    }

    public void updateGender(Gender gender) {
        this.gender = gender;
    }

    public void updateAddress(String address) {
        this.address = address;
    }

    public void updateUserKey(String userKey) { this.userKey = userKey; }

//    public void updateAccountId(Long accountId) {
//        this.accountId = accountId;
//    }
}
