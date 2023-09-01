package com.kustoms.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomRequest {

    private String nombre;
    private long precioCompra;
    private long precioRenta;
    private LocalDate fechaCompra;
    private String observaciones;
    private String talla;
    private Long idReference;
    private Long diasDePrestamo;

}
