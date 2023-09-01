package com.kustoms.repository;

import com.kustoms.models.Reference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferenceRepositoryDAO extends JpaRepository <Reference, Long> {
    Reference getReferenceByName(String nombreReferencia);

    boolean existsByName(String name);
}
