package com.kustoms.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Photos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "url")
    private String url;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reference_id")
    private Reference reference;

}
