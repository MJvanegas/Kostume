package com.kustoms.services;


import com.kustoms.dto.ReferenceRequest;
import com.kustoms.models.Photo;
import com.kustoms.models.Reference;
import com.kustoms.repository.PhotosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PhotoServiceImp {


    @Autowired
    PhotosRepository photosRespository;

    @Autowired
    ReferenceServiceImp referenceServiceImp;

    public void savePhotos (List<String> photosUrls , Reference referenceData){

        List<Photo> photos = new ArrayList<>();


        for (String url:photosUrls) {
            Photo photo = new Photo();
            photo.setUrl(url);
            photo.setReference(referenceData);
            photosRespository.save(photo);
            photos.add(photo);
        }

    }

    public List<Photo> getPhotosByReference(Reference reference) {
        return photosRespository.findByReference(reference);
    }





}
