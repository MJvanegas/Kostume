package com.kustoms.repository;

import com.kustoms.models.Category;
import com.kustoms.models.Characteristic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacteristicrepositoryDAO extends JpaRepository<Characteristic,Long> {
    boolean existsByName(String name);
}
