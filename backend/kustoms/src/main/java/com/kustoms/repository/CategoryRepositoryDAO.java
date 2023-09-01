package com.kustoms.repository;

import com.kustoms.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepositoryDAO extends JpaRepository <Category,Long> {

    Category findByName(String name);

    boolean existsByName(String name);
}
