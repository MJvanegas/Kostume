package com.kustoms.dto;


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
public class ResponseApiRegister {
    private String message;
}
