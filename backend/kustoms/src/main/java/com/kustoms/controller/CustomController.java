package com.kustoms.controller;
import com.kustoms.dto.CustomRequest;
import com.kustoms.dto.Response;
import com.kustoms.exceptions.ReferenceNotFoundException;
import com.kustoms.models.Custom;
import com.kustoms.services.CustomServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/disfraces")
@CrossOrigin(origins = "*") // permite todas las peticiones de cualquier origen. Usa con precaución.
public class CustomController {

    @Autowired
    private CustomServiceImp customServiceImp;

    @GetMapping("reference/{referenceId}")
    public ResponseEntity<Response> getCustomsByReference (@PathVariable Long referenceId){

        List<Custom> customs = customServiceImp.getCustomsByReferenceId(referenceId);
        if (!customs.isEmpty()) {
            Response response = new Response("Disfraces encontrados para la referencia", customs);
            return ResponseEntity.status(HttpStatus.FOUND).body(response);
        } else {
            Response response = new Response("No se encontraron disfraces para la referencia");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping()
    public ResponseEntity<Response> getAllCustoms() {
        List<Custom> customs = customServiceImp.getAllCustoms();
        if (!customs.isEmpty()) {
            Response response = new Response("Estos son los disfraces encontrados",customs);
            return ResponseEntity.status(HttpStatus.FOUND).body(response);
        } else {
            Response response = new Response("No se encontraron disfraces en inventario");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

        }
    }

    @PostMapping()
    public ResponseEntity<Response> createCustom(@RequestBody CustomRequest customRequest) {
        try {
            Custom custom = customServiceImp.createCustom(customRequest);
            // Forzar la inicialización del objeto Reference antes de la serialización
            custom.getReference();
            Response response = new Response("Disfraz agregado exitosamente", custom);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (ReferenceNotFoundException e) {
            Response response = new Response("La referencia con el nombre proporcionado no existe.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
