package com.kustoms.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ReferencesCustoms")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "referencia_id", nullable = false)
    private Long id;

    private String name;
    private String detail;
    @ManyToMany
    @JoinTable(
            name = "referencia_categoria",
            joinColumns = @JoinColumn(name = "referencia_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private List<Category> categories = new ArrayList<>();
    private String status;

    @ManyToMany
    @JoinTable(
            name = "referencia_caracteristica",
            joinColumns = @JoinColumn(name = "referencia_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id")
    )
    private List<Characteristic> characteristics = new ArrayList<>();


}
