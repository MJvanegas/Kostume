package com.kustoms.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "Customs")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Custom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String code;
    private String name;
    private Long priceBuy;
    private Long rentalPrice;
    private Long discount;
    private LocalDate datePurchase;
    private String status;
    private String observations;
    private String size;
    @ManyToOne
    @JoinColumn(name = "referencia_id")
    @JsonIgnore
    private Reference reference;

}
