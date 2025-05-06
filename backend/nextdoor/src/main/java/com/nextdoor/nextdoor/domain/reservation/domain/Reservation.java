package com.nextdoor.nextdoor.domain.reservation.domain;

import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private BigDecimal rentalFee;

    @NotNull
    private BigDecimal deposit;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    private Long rentalId;

    @NotNull
    private Long ownerId;

    @NotNull
    private Long renterId;

    @NotNull
    private Long feedId;

    public void updateStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void updateEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void updateRentalFee(BigDecimal rentalFee) {
        this.rentalFee = rentalFee;
    }

    public void updateDeposit(BigDecimal deposit) {
        this.deposit = deposit;
    }

    public void updateStatus(ReservationStatus status) {
        this.status = status;
    }
}
