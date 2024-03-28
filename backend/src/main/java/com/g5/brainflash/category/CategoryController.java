package com.g5.brainflash.category;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.ErrorResponse;
import com.g5.brainflash.user.User;

import lombok.RequiredArgsConstructor;

/**
 * Category controller class. Handles requests related to categories in system.
 */
@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    
    /**
     * Save a category to the database
     * @param user The user creating/editing flashcard
     * @param request The category request object
     * @return Response with result of saving category
     */
    @PostMapping("/add")
    public ResponseEntity<?> saveCategory(
        @AuthenticationPrincipal User user, @RequestBody CategoryRequest request
    ) {
        try {
            return ResponseEntity.ok(categoryService.saveCategory(user, request));
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage()));
        }
    }    

    /**
     * Delete a category from the database
     * @param user The user deleting the category
     * @param id ID of the category to delete
     * @return  Response with result of deleting category
     */
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(
        @AuthenticationPrincipal User user, @PathVariable Integer id
    ) {
        try {
            return ResponseEntity.ok(categoryService.deleteCategory(user.getId(), id));
        }
        catch(NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
        catch(UnauthorizedUserException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Update a category's information in the database
     * @param user The user owning the category to be updated
     * @param id ID of the category to update
     * @param request The category request object
     * @return Response with result of updating category
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCategory(
        @AuthenticationPrincipal User user, 
        @PathVariable Integer id, 
        @RequestBody CategoryRequest request
    ) {
        try {
            return ResponseEntity.ok(categoryService.updateCategory(user.getId(), id, request));
        }
        catch(NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
        catch(UnauthorizedUserException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage()));
        }
    }    
    
    /**
     * Get all categories for a user
     * @param user The user to get categories for
     * @return Response with list of categories
     */
    @GetMapping
    public ResponseEntity<?> getallCategories(
        @AuthenticationPrincipal User user
    ) {
        try {
            return ResponseEntity.ok(categoryService.getAllCategoriesByUserId(user.getId()));
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }    
}