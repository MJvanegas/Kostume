package com.kustoms.controller;

import com.kustoms.dto.CategoryDTO;
import com.kustoms.dto.CharacteristicRequest;
import com.kustoms.dto.CharacteristicResponse;
import com.kustoms.dto.Response;
import com.kustoms.exceptions.ErrorWhenSavePhotoException;
import com.kustoms.models.Category;
import com.kustoms.models.Custom;
import com.kustoms.services.CharacteristicServiceImp;
import com.kustoms.utils.ValidateCharacteristic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/caracteristicas")
@CrossOrigin(origins = "*")
public class CharacteristicController {

    @Autowired
    private CharacteristicServiceImp characteristicServiceImp;

    @Autowired
    private ValidateCharacteristic validateCharacteristic;

    @GetMapping()
    public ResponseEntity<Response> getAllCustoms() {
        List<CharacteristicResponse> allCharacteristic = characteristicServiceImp.getAllCharacteristic();
        if (!allCharacteristic.isEmpty()) {
            Response response = new Response("Estas son las caracteristicas encontradas encontrados",allCharacteristic);
            return ResponseEntity.status(HttpStatus.FOUND).body(response);
        } else {
            Response response = new Response("No se encontraron caracteristicas");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

        }
    }

    @PostMapping()
    public ResponseEntity<Response> createcharacteristic(@RequestPart("name") String name, @RequestPart("icon") MultipartFile icon){
        List<String> listErrors = validateCharacteristic.validateNewCharacteristic(name, icon);

        if (listErrors.isEmpty()) {

                CharacteristicRequest characteristicRequest = new CharacteristicRequest();
                characteristicRequest.setName(name);
                characteristicRequest.setIcon(icon);

            try {
                CharacteristicResponse characteristicResponse = characteristicServiceImp.createCharacteristic(characteristicRequest);
                if (characteristicResponse != null) {
                    Response response = new Response("Característica creada exitosamente", characteristicResponse);
                    return ResponseEntity.status(HttpStatus.CREATED).body(response);
                } else {
                    Response response = new Response("Error al guardar la caracteristica");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }

            } catch (ErrorWhenSavePhotoException e) {
                Response response = new Response("Error al guardar el icono en el servidor.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }
        Response response = new Response("Los datos ingresados para guardar la categoria no son validos.", listErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }




}
