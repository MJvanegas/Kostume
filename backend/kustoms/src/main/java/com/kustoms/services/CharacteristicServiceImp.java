package com.kustoms.services;


import com.kustoms.Mappers.CharacteristicMapper;
import com.kustoms.dto.CharacteristicRequest;
import com.kustoms.dto.CharacteristicResponse;
import com.kustoms.exceptions.ErrorWhenSavePhotoException;
import com.kustoms.models.Category;
import com.kustoms.models.Characteristic;
import com.kustoms.repository.CharacteristicrepositoryDAO;
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
public class  CharacteristicServiceImp {

    @Autowired
    private CharacteristicrepositoryDAO characteristicrepositoryDAO;

    @Autowired
    private ReferenceServiceImp referenceServiceImp;

    @Value("${server.port}")
    private Integer port;

    @Value("${ruta.images}")
    private String rutaImages;

    @Value("${ruta.url}")
    private String rutaUrl;

    public List<CharacteristicResponse> getAllCharacteristic (){

       List<Characteristic> characteristicList= characteristicrepositoryDAO.findAll();
        List<CharacteristicResponse> responses = new ArrayList<>();

        for (Characteristic characteristic : characteristicList) {
            CharacteristicResponse characteristicResponse = new CharacteristicResponse();

            characteristicResponse.setId(characteristic.getId());
            characteristicResponse.setName(characteristic.getName());
            characteristicResponse.setIcon( rutaUrl+ characteristic.getIcon());

            responses.add(characteristicResponse);
        }

        return responses;
    }

    public boolean existsCategoryByName(String name) {
        return  characteristicrepositoryDAO.existsByName(name);
    }

    public CharacteristicResponse createCharacteristic(CharacteristicRequest characteristicRequest) {
        Characteristic newCharacteristic = new Characteristic();
        newCharacteristic.setName(characteristicRequest.getName());

        String nameIcon = referenceServiceImp.generateNameUniquePhoto(characteristicRequest.getIcon());
        String fullpath = rutaImages + nameIcon;

        try {
            // Guardar icono en el servidor
            byte[] bytesFoto = characteristicRequest.getIcon().getBytes();
            Path rutIcono = Paths.get(fullpath);
            Files.write(rutIcono, bytesFoto);
            newCharacteristic.setIcon(nameIcon);
        } catch (IOException e) {
            throw new ErrorWhenSavePhotoException("Error al guardar el icono en el servidor.", e);
        }
        Characteristic characteristic = characteristicrepositoryDAO.save(newCharacteristic);

        CharacteristicResponse response = new CharacteristicResponse();
        response.setId(characteristic.getId());
        response.setName(characteristic.getName());
        response.setIcon(rutaUrl +characteristic.getIcon());

        return response;
    }

    public Optional<Characteristic> searchCharacteristicById(Long id) {
        return characteristicrepositoryDAO.findById(id);

    }
}
