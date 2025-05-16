package com.nextdoor.nextdoor.domain.rental.port;


public interface MemberUuidQueryPort {

    String getMemberUuidByRentalIdAndRole(Long rentalId, String userRole);
}