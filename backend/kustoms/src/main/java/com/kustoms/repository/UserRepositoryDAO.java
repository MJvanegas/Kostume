package com.kustoms.repository;

import com.kustoms.models.Category;
import com.kustoms.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepositoryDAO extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    Optional<User> findByUUID(String uuid);
}
