package com.kustoms.dto;


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
public class ResponseVerify {
    private MessageDTO message;

    // Getters y setters
    public MessageDTO getMessage() {
        return message;
    }

    public void setMessage(MessageDTO message) {
        this.message = message;
    }

    }
