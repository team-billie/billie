package com.nextdoor.nextdoor.domain.rental.service.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchRentalResult {

    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal rentalFee; //Per Day
    private BigDecimal deposit;
    private Long ownerId;
    private Long renterId;
    private Long rentalId;
    private String rentalProcess;
    private String rentalStatus;
    private String title;
    private List<String> productImages;
}
