package com.kustoms.services;

import com.kustoms.constants.CustomStatus;
import com.kustoms.dto.*;
import com.kustoms.exceptions.CategoryNotFoundException;
import com.kustoms.exceptions.ErrorUpload;
import com.kustoms.exceptions.ErrorWhenSavePhotoException;
import com.kustoms.models.Category;
import com.kustoms.models.Characteristic;
import com.kustoms.models.Photo;
import com.kustoms.models.Reference;
import com.kustoms.repository.ReferenceRepositoryDAO;
import com.kustoms.utils.PhotoProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service

public class ReferenceServiceImp{

    @Autowired
    ReferenceRepositoryDAO referenceRepositoryDAO;

    @Autowired
    CategoryServiceImpl categoryService;

    @Autowired
    PhotoServiceImp photoServiceImp;

    @Autowired
    PhotoProcessor photoProcessor;

    @Autowired
    CharacteristicServiceImp characteristicServiceImp;

    @Value("${ruta.images}")
    private String rutaImages;

    @Value("${server.port}")
    private Integer port;

    @Value("${ruta.url}")
    private String rutaUrl;


    public ReferenceResponse createPhotosReferencie (List<MultipartFile> photos, Long idReference){

            Reference referencie = getReferenceById(idReference);

            if(referencie != null){

                try {
                    List<String> photosUrls = savePhotosToServer(photos);

                    if(photosUrls!= null){
                        referencie.setStatus(String.valueOf(CustomStatus.ACTIVE));
                        photoServiceImp.savePhotos(photosUrls, referencie);
                        return mapperReferenceToReferenceResponse(referencie);
                    }

                } catch (ErrorWhenSavePhotoException e) {
                    return null;
                }

            }

        return null;

    }

    public Reference getReferenceByName (ReferenceRequest referenceRequest){

        return referenceRepositoryDAO.getReferenceByName(referenceRequest.getNombreReferencia());
    }

    public boolean existsReferenceByName (String name){

        return referenceRepositoryDAO.existsByName(name);
    }

    private List<Category> getCategoriasPorNombres(List<String> nombresCategorias) {

        List<Category> categorias = new ArrayList<>();
        for (String nombreCategoria : nombresCategorias) {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setName(nombreCategoria);
            Category category = categoryService.searchCategoryByName(categoryDTO);
            if (category != null) {
                categorias.add(category);
            } else {
                throw new CategoryNotFoundException("La categoría " + nombreCategoria + " no existe en la base de datos.");
            }
        }
        return categorias;
    }

    private List<String> savePhotosToServer(List<MultipartFile> photos) {
        /*List<String> photosUrls = new ArrayList<>();
        List<String> namesPhoto = new ArrayList<>();
        for (MultipartFile photo : photos) {

            String namePhoto = generateNameUniquePhoto(photo);
            String fullpath = rutaImages + namePhoto;
            System.out.println(fullpath+ "fullPath");
            try {
                // Guardar la foto en el servidor
                byte[] bytesFoto = photo.getBytes();
                Path rutaFoto = Paths.get(fullpath);
                Files.write(rutaFoto, bytesFoto);

                photosUrls.add(fullpath);
                namesPhoto.add(namePhoto);
            } catch (IOException e) {
                throw new ErrorWhenSavePhotoException("Error al guardar la foto en el servidor.", e);
            }
        }
        return namesPhoto;
        */

        return photoProcessor.savePhotosToServer(photos);
    }

    public String generateNameUniquePhoto(MultipartFile photo) {
        // Generar un nombre único para la foto
        String nameOriginal = photo.getOriginalFilename();
        String extension = nameOriginal.substring(nameOriginal.lastIndexOf('.'));
        String uniqueName = UUID.randomUUID().toString() + extension;
        return uniqueName;
    }

    public Reference getReferenceById(Long referenceId) {

        return referenceRepositoryDAO.getReferenceById(referenceId);
    }

    public List<Reference> getAllReferences() {
        List<Reference> allReferences = referenceRepositoryDAO.findAll();

        String statusActive = String.valueOf(CustomStatus.ACTIVE);

        List<Reference> activeReferences = allReferences.stream()
                .filter(reference -> statusActive.equals(reference.getStatus()))
                .toList();

        return  activeReferences;
    }

    public ReferenceResponse getReferenceCompleteById(Long referenceId) {
        Reference reference = getReferenceById(referenceId);
        if (reference != null) {
            ReferenceResponse referenceResponse = new ReferenceResponse();
            referenceResponse.setId(reference.getId());
            referenceResponse.setName(reference.getName());
            referenceResponse.setDetail(reference.getDetail());
            referenceResponse.setCategories(reference.getCategories());
            referenceResponse.setCharacteristics(reference.getCharacteristics());
            referenceResponse.setStatus(reference.getStatus());

            // Obtener las fotos por referencia
            List<Photo> photos = photoServiceImp.getPhotosByReference(reference);
            List<PhotoResponse> photoDTOs = generateURLPhotos(photos);

            // Asignar las fotos al DTO de la referencia
            referenceResponse.setPhotos(photoDTOs);

            return referenceResponse;
        } else {
            return null;
        }
    }


    public List<ReferenceResponse> getRamdomReferences() {

        List<Reference> allReferences = getAllReferences();
        List<Reference> shuffledList = new ArrayList<>(allReferences);
        Collections.shuffle(shuffledList);
        List<Reference> randomReferences= shuffledList.subList(0, Math.min(10, shuffledList.size()));
        List<ReferenceResponse> referencesRandomresponse = new ArrayList<>();

        for (Reference reference:randomReferences) {

            ReferenceResponse referenceResponse = new ReferenceResponse();
            referenceResponse.setId(reference.getId());
            referenceResponse.setName(reference.getName());
            referenceResponse.setDetail(reference.getDetail());
            List<Photo> photos = photoServiceImp.getPhotosByReference(reference);
            List<PhotoResponse> photoDTOs = generateURLPhotos(photos);
            referenceResponse.setPhotos(photoDTOs);
            referencesRandomresponse.add(referenceResponse);
        }

        return referencesRandomresponse;

    }


    public List<PhotoResponse> generateURLPhotos (List<Photo> photos){

        List<PhotoResponse> photoDTOs = new ArrayList<>();

        for (Photo photo : photos) {
            PhotoResponse photoDTO = new PhotoResponse();
            photoDTO.setId(photo.getId());
            // Establecer la ruta del servidor en el DTO de la foto
            photoDTO.setUrl(rutaUrl+ photo.getUrl());
            photoDTOs.add(photoDTO);
        }

        return photoDTOs;
    }

    public Reference  addCategoryReference (Reference reference, Category category){

        try {
            List<Category> categories = reference.getCategories();
            boolean existCaterory = categories.contains(category);
            if (!existCaterory) {
                categories.add(category);
                reference.setCategories(categories);
                return referenceRepositoryDAO.save(reference);
            } else {
                String response = "Error agregando la categoria";
                throw new ErrorUpload(response);
            }

            } catch(ErrorUpload e ){
                throw new ErrorUpload("La referencia ya contiene la categoria");
            }

    }

    public Reference createInfoReference(ReferenceInfoRequest referenceInfoRequest) {

        Reference reference = this.mappetreferenceInfoRequestToReference(referenceInfoRequest);
        return  referenceRepositoryDAO.save(reference);

    }


    public Reference mappetreferenceInfoRequestToReference (ReferenceInfoRequest referenceInfoRequest){
        Reference reference = new Reference();
        reference.setName(referenceInfoRequest.getNombreReferencia());
        reference.setDetail(referenceInfoRequest.getDescripcion());
        reference.setStatus(String.valueOf(CustomStatus.INCATIVEWHITHOUTPHOTOS));

        List <Category> categories= new ArrayList<>();

        for (Long id:referenceInfoRequest.getIdCategorias()) {

            Optional<Category> categoryadd = Optional.of(new Category());
            categoryadd = categoryService.searchCategotyById(id);

            categoryadd.ifPresent(categories::add);

        }

        reference.setCategories(categories);

        List <Characteristic> characteristics= new ArrayList<>();

        for (Long id:referenceInfoRequest.getIdSCaracteristicas()) {

            Optional<Characteristic> characteristicAdd = Optional.of(new Characteristic());
            characteristicAdd = characteristicServiceImp.searchCharacteristicById(id);

            characteristicAdd.ifPresent(characteristics::add);

        }

        reference.setCharacteristics(characteristics);

        return reference;

    }

    public ReferenceResponse mapperReferenceToReferenceResponse (Reference reference){

        ReferenceResponse referenceResponse = new ReferenceResponse();
        referenceResponse.setId(reference.getId());
        referenceResponse.setName(reference.getName());
        referenceResponse.setDetail(reference.getDetail());
        referenceResponse.setStatus(reference.getStatus());
        List<Photo> photos = photoServiceImp.getPhotosByReference(reference);
        List<PhotoResponse> photoDTOs = generateURLPhotos(photos);
        referenceResponse.setPhotos(photoDTOs);
        referenceResponse.setCategories(reference.getCategories());
        referenceResponse.setCharacteristics(reference.getCharacteristics());

        return  referenceResponse;
    }


}
