package com.kustoms.utils;

import com.kustoms.dto.UserRequest;
import com.kustoms.services.CategoryServiceImpl;
import com.kustoms.services.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Component
public class ValidateRegister {
    @Autowired
    private UserServiceImp userServiceImp;

    public List<String> validateNewUser (UserRequest userRequest){

        List <String>  listErrors = new ArrayList<>();

        if(userServiceImp.existUserByEmail(userRequest.getEmail())){
            listErrors.add("Error: El usuario ya se encuentra registrado");
        }

        if (userRequest.getNombre() == null) {
            listErrors.add("Error: El registro no posee nombre");
        }

        if (userRequest.getApellido() == null) {
            listErrors.add("Error: El registro no posee apellido");
        }

        if (userRequest.getContraseña() == null){
            listErrors.add("Error: El registro no posee contraseña");
        } else if (userRequest.getContraseña().length() < 6) {
            listErrors.add("Error: La contraseña debe tener al menos 6 caracteres");
        } else if (!userRequest.getContraseña().matches(".*\\d.*")) {
            listErrors.add("Error: La contraseña debe contener al menos un número");
        }

        return listErrors;

    }

}
