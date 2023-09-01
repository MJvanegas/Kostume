package com.kustoms.utils;

import com.kustoms.dto.CategoryDTO;
import com.kustoms.models.Category;
import com.kustoms.services.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Component
public class ValidateCategory {

    @Autowired
    private CategoryServiceImpl categoryService;

    public List<String> validateNewCategory (String name, MultipartFile photo){

        List <String>  listErrors = new ArrayList<>();

        if(categoryService.existsCategoryByName(name)){
            listErrors.add("Error: El nombre de la categoria ya existe.");
        }

        if (photo == null || photo.isEmpty()) {
            listErrors.add("Error: No se enviaro foto.");
        }

        return listErrors;

    }

}
