package com.kustoms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceRequest {

    private String nombreReferencia;
    private String descripcion;
    private List<String> nombresCaterorias;
    private List<MultipartFile> fotos;

    public ReferenceRequest(String nombreReferencia, List<String> nombresCaterorias) {
        this.nombreReferencia = nombreReferencia;
        this.nombresCaterorias = nombresCaterorias;
    }
}
