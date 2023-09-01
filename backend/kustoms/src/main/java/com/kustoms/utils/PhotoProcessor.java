package com.kustoms.utils;


import com.kustoms.exceptions.ErrorWhenSavePhotoException;
import com.kustoms.services.ReferenceServiceImp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Component
public class PhotoProcessor {

    private final Logger logger = LoggerFactory.getLogger(PhotoProcessor.class);

    @Autowired
    private ReferenceServiceImp referenceServiceImp;

    @Value("${ruta.images}")
    private String rutaImages;

    private static final int NUM_THREADS = 4;

    public List<String> savePhotosToServer(List<MultipartFile> photos) {
        logger.info("Entering photo processor to save images.");

        List<String> namesPhoto = new ArrayList<>();
        ExecutorService executor = Executors.newFixedThreadPool(NUM_THREADS);

        for (MultipartFile photo : photos) {
            executor.submit(() -> {
                try {
                    String namePhoto = referenceServiceImp.generateNameUniquePhoto(photo);
                    String fullpath = rutaImages + namePhoto;
                    logger.info("Saving photo to path: " + fullpath);

                    byte[] bytesFoto = photo.getBytes();
                    Path rutaFoto = Paths.get(fullpath);
                    Files.write(rutaFoto, bytesFoto);

                    synchronized (namesPhoto) {
                        namesPhoto.add(namePhoto);
                    }

                    logger.info("Photo saved: " + namePhoto);
                } catch (Exception e) {
                    logger.error("Error saving photo to server.", e);
                    throw new RuntimeException(e);
                }
            });
        }

        executor.shutdown();
        try {
            executor.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        logger.info("Photos processing completed.");
        return namesPhoto;
    }
}