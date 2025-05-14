package com.nextdoor.nextdoor.domain.chat.application.dto;

import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for rental information needed by chat domain
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentalDto {
    private Long rentalId;
    private RentalProcess rentalProcess;
}