package com.nextdoor.nextdoor.domain.rental.message;

import lombok.*;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentalStatusMessage {

    private String process;
    private String detailStatus;
}
