package com.kustoms.dto;

import com.kustoms.constants.RolEnum;
import com.kustoms.constants.StateUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private String UUID;
    private String name;
    private String lastName;
    private String email;
    private String documentNumber;
    private String city;
    private String department;
    private String address;
    private RolEnum role;
    private StateUser statate;

}
