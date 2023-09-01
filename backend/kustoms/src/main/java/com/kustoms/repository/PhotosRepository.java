package com.kustoms.repository;

import com.kustoms.models.Photo;
import com.kustoms.models.Reference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotosRepository extends JpaRepository <Photo,Long> {
    List<Photo> findByReference(Reference reference);
}
