package com.g5.brainflash.category;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
    List<Category> findAllByUserId(Integer userId);
    void deleteById(Integer categoryId);
}
