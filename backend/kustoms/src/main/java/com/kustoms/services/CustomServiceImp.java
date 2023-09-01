package com.kustoms.services;

import com.kustoms.constants.CustomStatus;
import com.kustoms.dto.CustomRequest;
import com.kustoms.exceptions.ReferenceNotFoundException;
import com.kustoms.models.Custom;
import com.kustoms.models.Reference;
import com.kustoms.repository.CustomRepositoryDAO;
import com.kustoms.utils.CustomCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CustomServiceImp {

    @Autowired
    private CustomRepositoryDAO customRepositoryDAO;

    @Autowired
    private ReferenceServiceImp referenceServiceImp;

    @Autowired
    private CustomCodeGenerator customCodeGenerator;


    public List<Custom> getCustomsByReferenceId(Long referenceId) {

        Reference reference = referenceServiceImp.getReferenceById(referenceId);
        List<Custom> allCustoms = customRepositoryDAO.findCustomByReference(reference);
        List<Custom> activeCustoms = new ArrayList<>();

        for (Custom custom: allCustoms) {
            String status = custom.getStatus();
            String statusEnum = String.valueOf(CustomStatus.ACTIVE);
            if (Objects.equals(status, statusEnum)){
                activeCustoms.add(custom);
            }
        }

        Map<String, Custom> map = new HashMap<>();

        for (Custom custom : activeCustoms) {
            // Si el map ya contiene el size
            if (map.containsKey(custom.getSize())) {
                // Si el current custom no tiene observaciones, reemplaza el que está en el map
                if (custom.getObservations() == null) {
                    map.put(custom.getSize(), custom);
                }
            } else {
                // Si el size no está en el map aún, simplemente añade el custom
                map.put(custom.getSize(), custom);
            }
        }

        // Return the list of Custom objects from the map values
        return new ArrayList<>(map.values());
    }

    public List<Custom> getAllCustoms() {
        return customRepositoryDAO.findAll();
    }

    public Custom createCustom(CustomRequest customRequest) {

        Custom newCustom = mappedNawCustom(customRequest);
        return customRepositoryDAO.save(newCustom);

    }

    public Custom mappedNawCustom(CustomRequest customRequest){
        Custom custom = new Custom();
        String code = generateCodeCustom(customRequest);
        custom.setCode(code);
        custom.setName(customRequest.getNombre());
        custom.setPriceBuy(customRequest.getPrecioCompra());
        custom.setRentalPrice(customRequest.getPrecioRenta());
        custom.setDiscount(0L); // ojo aca se puede gerenar un metodo para generar un descuento deacierdo a una bandera
        custom.setDatePurchase(customRequest.getFechaCompra());
        custom.setStatus(CustomStatus.ACTIVE.toString());
        custom.setObservations(customRequest.getObservaciones());
        custom.setSize(customRequest.getTalla());

        if (customRequest.getIdReference() != null) {
            Reference referenceCustom = referenceServiceImp.getReferenceById(customRequest.getIdReference());
            custom.setReference(referenceCustom);
        } else {
            throw new ReferenceNotFoundException("Referencia no encontrada");
        }
        return custom;
    }


    public String generateCodeCustom (CustomRequest customRequest){
        String name = customRequest.getNombre();
        String namereference = referenceServiceImp.getReferenceById(customRequest.getIdReference()).getName();
        String size = customRequest.getTalla();
        return CustomCodeGenerator.generateCustomCode(name,namereference,size);

    }
}