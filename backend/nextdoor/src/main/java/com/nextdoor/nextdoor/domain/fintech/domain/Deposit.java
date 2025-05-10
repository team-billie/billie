package com.nextdoor.nextdoor.domain.fintech.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "deposit")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Deposit {
    @Id
    @Column(name = "deposit_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "rental_id", nullable = false)
//    private Rental rental;
    @Column(name = "rental_id", nullable = false)
    private Long rentalId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "regist_account_id", nullable = false)
    private RegistAccount registAccount;

    @Column(nullable = false)
    private Integer amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DepositStatus status; // HELD, RETURNED, DEDUCTED

    @Column(name = "deducted_amount")
    private Integer deductedAmount;

    @Column(name = "held_at", nullable = false)
    private LocalDateTime heldAt;

    @Column(name = "returned_at")
    private LocalDateTime returnedAt;
}