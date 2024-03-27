package com.g5.brainflash.category;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g5.brainflash.user.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    
    @PostMapping("/add")
    public ResponseEntity<?> saveCategory(
        @AuthenticationPrincipal User user, @RequestBody CategoryRequest request
    ) {
        return ResponseEntity.ok(categoryService.saveCategory(user, request));
    }    


    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(
        @AuthenticationPrincipal User user, @PathVariable Integer id
    ) {
        return ResponseEntity.ok(categoryService.deleteCategory(user.getId(), id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCategory(
        @AuthenticationPrincipal User user, 
        @PathVariable Integer id, 
        @RequestBody CategoryRequest request
    ) {
        return ResponseEntity.ok(categoryService.updateCategory(user.getId(), id, request));
    }    
    
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getallCategories(
        @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(categoryService.getAllCategoriesByUserId(user.getId()));
    }    

}
