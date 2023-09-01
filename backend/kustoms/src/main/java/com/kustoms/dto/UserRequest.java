package com.kustoms.dto;

import com.kustoms.constants.RolEnum;
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
public class UserRequest {

    private String nombre;
    private String apellido;
    private String email;
    private String numerodeIdentificacion;
    private String ciudad;
    private String departamento;
    private String direccion;
    private String contraseña;

}
