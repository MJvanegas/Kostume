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
public class CategoryDTO {

    private String name;
    private MultipartFile photo;

}
