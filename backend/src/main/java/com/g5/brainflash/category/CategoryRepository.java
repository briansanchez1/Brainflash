package com.g5.brainflash.category;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Category repository interface. Used to interact with the database for category-related purposes.
 */
public interface CategoryRepository extends JpaRepository<Category, Integer>{
    List<Category> findAllByUserId(Integer userId);
    Optional<Category> findById(Integer id);
    void deleteById(Integer categoryId);
}