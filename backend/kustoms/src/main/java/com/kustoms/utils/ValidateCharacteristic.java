package com.kustoms.utils;

import com.kustoms.services.CharacteristicServiceImp;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;


@Component
public class ValidateCharacteristic {

    @Autowired
    private CharacteristicServiceImp characteristicService;
    public List<String> validateNewCharacteristic (String name, MultipartFile photo){

        List <String>  listErrors = new ArrayList<>();

        if(characteristicService.existsCategoryByName(name)){
            listErrors.add("Error: El nombre de la caracteristica ya existe.");
        }

        if (photo == null || photo.isEmpty()) {
            listErrors.add("Error: No se envio icono.");
        }

        return listErrors;

    }
}
