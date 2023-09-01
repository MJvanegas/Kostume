package com.kustoms.controller;

import com.kustoms.dto.CategoryDTO;
import com.kustoms.dto.CategoryResponse;
import com.kustoms.dto.Response;
import com.kustoms.exceptions.ErrorWhenSavePhotoException;
import com.kustoms.models.Category;
import com.kustoms.services.CategoryService;
import com.kustoms.services.CategoryServiceImpl;
import com.kustoms.utils.ValidateCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*") // permite todas las peticiones de cualquier origen. Usa con precaución.
public class CategotyController {

    @Autowired
    private CategoryServiceImpl categoryService;

    @Autowired
    private ValidateCategory validateCategory;

    @PostMapping
    public ResponseEntity<Response> createCategory (@RequestPart("name") String name, @RequestPart("photo") MultipartFile photo){

        List<String> listError = validateCategory.validateNewCategory(name,photo);

        if (listError.isEmpty()) {

            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setName(name);
            categoryDTO.setPhoto(photo);

            try {
                Category category = categoryService.createCategory(categoryDTO);
                if (category != null) {
                    Response response = new Response("Categoria creada exitosamente", category);
                    return ResponseEntity.status(HttpStatus.CREATED).body(response);
                } else {
                    Response response = new Response("Error al guardar la categoria");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }

            } catch (ErrorWhenSavePhotoException e) {
                Response response = new Response("Error al guardar la foto en el servidor.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }
        Response response = new Response("Los datos ingresados para guardar la categoria no son validos.", listError);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    @GetMapping
    public ResponseEntity<Response> getAllCategory (){
        List<CategoryResponse> categories = categoryService.getAllCategories();

        if (!categories.isEmpty()) {
            Response response = new Response("Lista de categorías encontrada", categories);
            return ResponseEntity.ok(response);
        } else {
            Response response = new Response("No se encontraron categorías");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
