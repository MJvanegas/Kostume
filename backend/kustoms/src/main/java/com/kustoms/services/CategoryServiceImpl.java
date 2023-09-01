package com.kustoms.services;

import com.kustoms.dto.CategoryDTO;
import com.kustoms.dto.CategoryResponse;
import com.kustoms.exceptions.ErrorWhenSavePhotoException;
import com.kustoms.models.Category;
import com.kustoms.repository.CategoryRepositoryDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl  implements CategoryService{

    @Autowired
    CategoryRepositoryDAO categoryRepositoryDAO;

    @Autowired
    private ReferenceServiceImp referenceServiceImp;

    @Value("${ruta.images}")
    private String rutaImages;

    @Value("${server.port}")
    private Integer port;

    @Value("${ruta.url}")
    private String rutaUrl;

    public Category createCategory(CategoryDTO categoryDTO) {

        Category newCategory = new Category();
        newCategory.setName(categoryDTO.getName());

        String namePhoto = referenceServiceImp.generateNameUniquePhoto(categoryDTO.getPhoto());
        String fullpath = rutaImages + namePhoto;

        try {
            // Guardar la foto en el servidor
            byte[] bytesFoto = categoryDTO.getPhoto().getBytes();
            Path rutaFoto = Paths.get(fullpath);
            Files.write(rutaFoto, bytesFoto);
            newCategory.setPhoto(namePhoto);
        } catch (IOException e) {
            throw new ErrorWhenSavePhotoException("Error al guardar la foto en el servidor.", e);
        }
        Category category = categoryRepositoryDAO.save(newCategory);
        return category;

    }

    public Category searchCategoryByName (CategoryDTO categoryDTO){

        Category category = new Category();
        category = categoryRepositoryDAO.findByName(categoryDTO.getName());
        return category;

    }

    public List<CategoryResponse> getAllCategories() {

        List<CategoryResponse> categoryResponseList = new ArrayList<>();
        List<Category>  categories = categoryRepositoryDAO.findAll();


        for (Category category : categories) {
            CategoryResponse categoryresponse = new CategoryResponse();

            categoryresponse.setId(category.getId());
            categoryresponse.setName(category.getName());
            categoryresponse.setPhoto(rutaUrl + category.getPhoto());

            categoryResponseList.add(categoryresponse);
        }

        return categoryResponseList;
    }


    public boolean existsCategoryByName(String name) {

        return  categoryRepositoryDAO.existsByName(name);
    }

    public Optional<Category> searchCategotyById (Long id){

        return categoryRepositoryDAO.findById(id);
    }


}
