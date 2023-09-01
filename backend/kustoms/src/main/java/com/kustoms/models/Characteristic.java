package com.kustoms.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Characteristic")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Characteristic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "characteristic_id", nullable = false)
    private Long id;
    private String name;
    private String icon;
}
