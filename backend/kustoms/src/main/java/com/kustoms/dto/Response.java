package com.kustoms.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Response {

    private String message;
    private Object data;

    public Response(String message) {
        this.message = message;
    }
}
