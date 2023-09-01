package com.kustoms.utils;

import com.kustoms.dto.CategoryDTO;
import com.kustoms.dto.Response;
import com.kustoms.models.Category;
import com.kustoms.services.CategoryServiceImpl;
import com.kustoms.services.ReferenceServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Component
public class ValidateNewReference {

    @Autowired
    private CategoryServiceImpl categoryService;

    @Autowired
    private ReferenceServiceImp referenceService;

    public List<String> validateNewReference (String name, List<Long> categories){

        List <String>  listErrors = new ArrayList<>();

        if(referenceService.existsReferenceByName(name)){
            listErrors.add("Error: El nombre de la referencia ya existe.");
        }


        if (name == null || name.isEmpty()) {
            listErrors.add("Error: La referencia debe tener un nombre.");
        }

        if (categories == null || categories.isEmpty()) {
            listErrors.add("Error: La lista de categorias esta vacia");
        } else {
            for (Long categoryId : categories) {
                Optional<Category> category = categoryService.searchCategotyById(categoryId);
                if (category.isEmpty()) {
                    listErrors.add("Error: La categoría con el id: " + categoryId+ " no existe en la base de datos.");
                }
            }
        }

    return listErrors;

    }
}
