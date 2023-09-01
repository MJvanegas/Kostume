package com.kustoms.dto;


import com.kustoms.models.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceResponseWhithChategories {

    private Long id;
    private String name;
    private String detail;
    private List<PhotoResponse> photos;
    private List<Category> categories;
}
