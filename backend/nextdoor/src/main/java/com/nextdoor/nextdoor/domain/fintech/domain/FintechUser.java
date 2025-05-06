package com.nextdoor.nextdoor.domain.fintech.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "fintech_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//사용자의 이메일로 계정 생성 후 반환받은 userKey를 저장
public class FintechUser {
    @Id
    private String userKey;
    private String email;
    private LocalDateTime createdAt;
}