package com.kustoms.services;

import com.kustoms.constants.RolEnum;
import com.kustoms.constants.StateUser;
import com.kustoms.dto.RegisterRequest;
import com.kustoms.dto.ResponseApiRegister;
import com.kustoms.dto.UserRequest;
import com.kustoms.dto.UserResponse;
import com.kustoms.exceptions.UnsuccessfulRegistration;
import com.kustoms.models.User;
import com.kustoms.repository.UserRepositoryDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImp {

  @Autowired
  private UserRepositoryDAO userRepository;


  private final RegistroMicroservicioClient registroClient;
    public UserServiceImp(RegistroMicroservicioClient registroClient) {
        this.registroClient = registroClient;
    }

    public UserResponse createUser(UserRequest userRequest){

        RegisterRequest registerRequest= mapperUserRequestToRegisterRequest(userRequest);

        try {
            User newUser = mapperUserRequestToUser(userRequest);
            User usersave = userRepository.saveAndFlush(newUser);
            try {
                ResponseEntity<ResponseApiRegister> response = registroClient.registrarUsuario(registerRequest);
                System.out.println("Respuesta del sercicio de registro de usuario"+ response);
                return mapperUserToUserResponse(usersave);
            } catch (HttpClientErrorException e) {
                System.out.println("Respuesta del sercicio de registro de usuario "+ usersave.getId());
                userRepository.delete(usersave);
            }

        } catch (Exception e) {

            throw new UnsuccessfulRegistration("Error al registrar el nuevo usuario en base de datos propia",e);
        }

        return null;

  }


  public RegisterRequest mapperUserRequestToRegisterRequest (UserRequest userRequest){

        RegisterRequest registerRequest = new RegisterRequest();

        registerRequest.setEmail(userRequest.getEmail());
        registerRequest.setFullname(userRequest.getNombre() + " " + userRequest.getApellido());
        registerRequest.setPassword(userRequest.getContraseña());
        registerRequest.setRole(String.valueOf(RolEnum.USER));

        return registerRequest;
  }


  public User mapperUserRequestToUser (UserRequest userRequest){

      User user = new User();
      user.setUUID(UUID.randomUUID().toString());
      user.setName(userRequest.getNombre());
      user.setLastName(userRequest.getApellido());
      user.setEmail(userRequest.getEmail());
      user.setDocumentNumber(userRequest.getNumerodeIdentificacion());
      user.setCity(userRequest.getCiudad());
      user.setDepartment(userRequest.getDepartamento());
      user.setAddress(userRequest.getDireccion());
      user.setRole(RolEnum.USER);
      user.setStatus(StateUser.ACTIVE);

      return user;
  }

public UserResponse mapperUserToUserResponse(User user){

        UserResponse userResponse = new UserResponse();
        userResponse.setUUID(user.getUUID());
        userResponse.setName(user.getName());
        userResponse.setLastName(user.getLastName());
        userResponse.setEmail(user.getEmail());
        userResponse.setDocumentNumber(user.getDocumentNumber());
        userResponse.setCity(user.getCity());
        userResponse.setDepartment(user.getDepartment());
        userResponse.setAddress(user.getAddress());
        userResponse.setRole(user.getRole());
        userResponse.setStatate(user.getStatus());

        return userResponse;

}

    public boolean existUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public UserResponse getInfoUser(String email) {

        User user = findUserByEmail(email);
        return mapperUserToUserResponse(user);

    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
