package com.kustoms.controller;


import com.kustoms.dto.*;
import com.kustoms.exceptions.UnsuccessfulRegistration;
import com.kustoms.models.User;
import com.kustoms.services.RegistroMicroservicioClient;
import com.kustoms.services.UserServiceImp;
import com.kustoms.utils.ValidateRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/registro")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserServiceImp userServiceImp;

    @Autowired
    private ValidateRegister validateRegister;

    private final RegistroMicroservicioClient registroClient;

    public UserController(RegistroMicroservicioClient registroClient) {
        this.registroClient = registroClient;
    }

    @PostMapping
    public ResponseEntity<Response> registerNewUser (@RequestBody UserRequest userRequest){

        List<String> listError = validateRegister.validateNewUser(userRequest);

        if(listError.isEmpty()) {

            try {

                UserResponse userResponse = userServiceImp.createUser(userRequest);

                if (userResponse != null) {
                    Response response = new Response("Usuario registrado exitosamente", userResponse);
                    return ResponseEntity.status(HttpStatus.CREATED).body(response);
                }

            } catch (UnsuccessfulRegistration e) {
                Response response = new Response("Error al registrar el usuario");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

            }

            Response response = new Response("Error al realizar registro de los datos de autenticación del usuario");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);

        }

        Response response = new Response("Revisa los datos para crear el usuario, se han encontrado errores", listError);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    @GetMapping
    public ResponseEntity<Response> viewInfoUser (@RequestHeader("Authorization") String token){
        VerifyUser verifyUser = new VerifyUser(token);
        try{
            ResponseEntity<ResponseVerify> response=  registroClient.verifyUser(verifyUser);
            if(Objects.equals(Objects.requireNonNull(response.getBody()).getMessage().getRole(), "USER") ){
               UserResponse userResponse = userServiceImp.getInfoUser(response.getBody().getMessage().getEmail());
               if(userResponse!=null) {
                   Response responseApi = new Response("Estos son los datos registrados", userResponse);
                   return ResponseEntity.status(HttpStatus.FOUND).body(responseApi);
               }
            } else {
                Response responseApi = new Response("No posees los permisos necesarios");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseApi);
            }

        } catch (Exception e) {
            Response responseApi = new Response("Token incorrecto");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseApi);
        }

        Response responseApi = new Response("Hubo un error buscando los datos");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseApi);

    }



}
