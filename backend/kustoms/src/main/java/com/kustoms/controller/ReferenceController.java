package com.kustoms.controller;

import com.kustoms.dto.*;
import com.kustoms.exceptions.ErrorUpload;
import com.kustoms.exceptions.ErrorWhenSavePhotoException;
import com.kustoms.models.Category;
import com.kustoms.models.Reference;
import com.kustoms.services.CategoryServiceImpl;
import com.kustoms.services.ReferenceServiceImp;
import com.kustoms.utils.ValidateNewReference;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/referencias")
@CrossOrigin(origins = "*") // permite todas las peticiones de cualquier origen. Usa con precaución.
public class ReferenceController {


    @Autowired
    private ReferenceServiceImp referenceService;

    @Autowired
    private ValidateNewReference validateNewReference;

    @Autowired
    public CategoryServiceImpl categoryService;


    @PostMapping
    public ResponseEntity<Response> createInfoReference(@RequestBody ReferenceInfoRequest referenceInfoRequest) {

        List<String> listError = validateNewReference.validateNewReference(referenceInfoRequest.getNombreReferencia(), referenceInfoRequest.getIdCategorias());

        if(listError.isEmpty()) {
            try {
                Reference referenceResponseWhithChategories = referenceService.createInfoReference(referenceInfoRequest);
                if (referenceResponseWhithChategories != null) {
                    Response response = new Response("Referencia creada exitosamente", referenceResponseWhithChategories);
                    return ResponseEntity.status(HttpStatus.CREATED).body(response);
                } else {
                    Response response = new Response("Error al guardar la referencia");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

        }
        Response response = new Response("Revisa los datos para crear la referencia, se han encontrado errores", listError);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    @PostMapping("{idReferencia}/photos")
    public ResponseEntity<Response> createReference(@RequestPart("photos") List<MultipartFile> photos,
                                                    @PathVariable Long idReferencia) {

        try {
            ReferenceResponse reference = referenceService.createPhotosReferencie(photos, idReferencia);

            if (reference != null) {
                Response response = new Response("Fotos actualizadas correctamente", reference);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            } else {
                Response response = new Response("Error al guardar las fotos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        } catch (ErrorWhenSavePhotoException e) {
            Response response = new Response(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Reference>> getAllReferences() {
        List<Reference> references = referenceService.getAllReferences();
        return ResponseEntity.ok(references);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getReferenceById(@PathVariable Long id) {
        ReferenceResponse referenceResponse = referenceService.getReferenceCompleteById(id);
        if (referenceResponse != null) {
            Response response = new Response("Estos son los datos de la referencia consultada.", referenceResponse);
            return ResponseEntity.status(HttpStatus.FOUND).body(response);
        } else {
            Response response = new Response("Error obtener la informacion de la referencia.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping("/referenciasaleatorias")
    public ResponseEntity<Response> getRamdomReferences() {
        // retorna maximo 10 referencias aleatorias
       List<ReferenceResponse>  referenceResponse = referenceService.getRamdomReferences();
        if (referenceResponse != null) {
            Response response = new Response("Estos son los datos de las 10 referencias generadas aleatoriamente", referenceResponse);
            return ResponseEntity.status(HttpStatus.FOUND).body(response);
        } else {
            Response response = new Response("Error obtener la informacion de las referencias.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PatchMapping("{idReference}/categorias")
    public ResponseEntity<Response> addCategoryToReference(@PathVariable Long idReference, @RequestBody CategoryRequest category) {

        Reference reference = referenceService.getReferenceById(idReference);
        Optional<Category> addCategory = categoryService.searchCategotyById(category.getId());

        try {
            if (reference != null && addCategory.isPresent()) {
                Reference referenceUpdate = referenceService.addCategoryReference(reference, addCategory.get());
                Response response = new Response("Se ha agregado categoria con exito", referenceUpdate);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }
        } catch (ErrorUpload e) {
            Response response = new Response("No se pudo agregar la categoria", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }


        Response response = new Response("Los datos proporcionados son incorrectos");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

    }






}
