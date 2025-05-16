package com.nextdoor.nextdoor.domain.rental.message;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentalStatusMessage {

    private Long rentalId;
    private String process;
    private String detailStatus;
}
