package com.kustoms.models;

import com.kustoms.constants.RolEnum;
import com.kustoms.constants.StateUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user", nullable = false)
    private Long id;
    private String UUID;
    private String name;
    private String lastName;
    private String email;
    private String documentNumber;
    private String city;
    private String department;
    private String address;
    private RolEnum role;
    private StateUser status;

}
