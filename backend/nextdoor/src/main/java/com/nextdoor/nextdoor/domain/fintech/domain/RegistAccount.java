//package com.nextdoor.nextdoor.domain.fintech.domain;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.*;
//import lombok.*;
//import java.time.LocalDateTime;
//
//@Entity
////@Table(name = "regist_account",
////        uniqueConstraints = @UniqueConstraint(
////                name = "uq_primary_account_per_user",
////                columnNames = {"user_key", "is_primary"}
////        )
////)
//@Table(name = "regist_account")   // uniqueConstraints 삭제버전
//@Data @NoArgsConstructor @AllArgsConstructor @Builder
//@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
//public class RegistAccount {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "regist_account_id")
//    private Long id;
//    //↳ 기존 userId 컬럼을 지우고
//    // @Column(name = "user_id", nullable = false)
//    // private Long userId;
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "user_key", nullable = false)
//    @JsonIgnore
//    private FintechUser user;
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "account_id", nullable = false)
//    private Account account;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "account_type", nullable = false, length = 20)
//    private RegistAccountType accountType; // BILI_PAY or EXTERNAL
//
//    @Column(length = 50)
//    private String alias;
//
//    @Column(name = "is_primary", nullable = false)
//    private Boolean primary;
//
//    @Column(nullable = false)
//    private Integer balance;
//
//    @Column(name = "registered_at", nullable = false)
//    private LocalDateTime registeredAt;
//
//    // ↓ DB에서 자동 생성 & 관리할 generated column 매핑 (읽기 전용)
//    // 계좌등록 api에서 uq_primary_account_per_user 유니크 제약조건이 깨지는 에러 해결하기 위해 추가
//    @Column(name = "primary_key_for_index", insertable = false, updatable = false)
//    private String primaryKeyForIndex;
//}