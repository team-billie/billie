package com.nextdoor.nextdoor.domain.rental.domain;

public enum RentalStatus {
    CREATED, //예약 확정 후 대여 생성 시점
    BEFORE_PHOTO_REGISTERED, //대여 시 Owner가 물품 사진 업로드한 후 시점
    REMITTANCE_REQUESTED, //Owner의 결제(송금) 요청 시점
    REMITTANCE_CONFIRMED, //Renter의 결제(송금) 완료 시점
    RENTAL_PERIOD_ENDED, //대여 끝난 시점
    AFTER_PHOTO_REGISTERED, //반납 시 Renter가 물품 사진 업로드한 후 시점
    DEPOSIT_REQUESTED, //보증금 처리 요청된 시점
    RENTAL_COMPLETED, //대여가 끝난 시점
    CANCELLED //취소
}
