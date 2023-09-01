package com.kustoms.repository;

import com.kustoms.models.Custom;
import com.kustoms.models.Reference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomRepositoryDAO extends JpaRepository <Custom,Long> {



    List<Custom> findCustomByReference(Reference reference);
}
