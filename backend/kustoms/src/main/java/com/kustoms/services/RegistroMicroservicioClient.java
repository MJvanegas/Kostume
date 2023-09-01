package com.kustoms.services;

import com.kustoms.Config.MicroservicioConfig;
import com.kustoms.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RegistroMicroservicioClient {
    private final RestTemplate restTemplate;
    private final String servicioUrl;

    private final String key;

    @Value("${microservicio.api-key}")
    private String apiKey;


    @Autowired
    public RegistroMicroservicioClient(MicroservicioConfig config) {
        this.restTemplate = new RestTemplate();
        this.servicioUrl = config.getUrl();
        this.key = apiKey;
    }

    public ResponseEntity<ResponseApiRegister> registrarUsuario(RegisterRequest request) {

        String urlRegistro = servicioUrl + "/register"; // Construyendo la URL completa para el registro

        HttpHeaders headers = new HttpHeaders();
        headers.add("x-api-key", apiKey);

        System.out.println(apiKey+ "este es el api key");

        HttpEntity<RegisterRequest> httpEntity = new HttpEntity<>(request, headers);
        return restTemplate.postForEntity(urlRegistro, httpEntity, ResponseApiRegister.class);

    }

    public ResponseEntity<ResponseVerify> verifyUser(VerifyUser verifyUser) {

        String urlVerify = servicioUrl + "/verify";
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-api-key", apiKey);

        HttpEntity<VerifyUser> httpEntity = new HttpEntity<>(verifyUser, headers);
        return restTemplate.postForEntity(urlVerify, httpEntity, ResponseVerify.class);

    }

}
