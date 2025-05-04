package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.service.dto.MemberDto;

public interface ReservationMemberQueryService {

    MemberDto findById(Long id);
}
