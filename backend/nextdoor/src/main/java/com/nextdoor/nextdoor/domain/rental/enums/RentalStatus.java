package com.nextdoor.nextdoor.domain.rental.enums;

public enum RentalStatus {
    CREATED, //안심 사진 등록 전
    BEFORE_PHOTO_REGISTERED, //안심 사진 등록 후
    REMITTANCE_REQUESTED, //결제 요청 상태
    REMITTANCE_CONFIRMED,
    RENTAL_PERIOD_ENDED,//결제 확인 -> 대여 시작 -> 클라이언트에게 어떻게 알려주지?
    AFTER_PHOTO_REGISTERED,//대여 당일 되면 클라이언트에게 사진 등록하라고 알려줘야함,
    DEPOSIT_REQUESTED,
    RENTAL_COMPLETED, //보증금 0원이면 바로 COMPLETED, 보증금 있으면 OWNER 보증금 처리 후 COMPLETED
    CANCELLED
}
