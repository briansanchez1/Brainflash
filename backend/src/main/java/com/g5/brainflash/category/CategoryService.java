package com.g5.brainflash.category;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.user.User;

import lombok.RequiredArgsConstructor;

/**
 * Category service class. Handles logic relating to categories in system
 */
@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository; 

    /**
     * Build category DTO to be saved
     * @param user The user creating/editing category
     * @param request The category request object
     * @return The category DTO to be saved
     */
    @Transactional
    public CategoryDTO saveCategory(User user, CategoryRequest request ) {
        Category category = Category.builder().title(request.getTitle()).cardCount(0).user(user).build();

        category = categoryRepository.save(category);

        return CategoryDTO.builder()
            .id(category.getId())
            .title(category.getTitle())
            .cardCount(0)
            .build();
    }    

    /**
     * Get all categories for a user
     * @param userId The ID of the user
     * @return List of all category DTOs
     */
    @Transactional
    public List<CategoryDTO> getAllCategoriesByUserId(Integer userId) {
        List<Category> categories = categoryRepository.findAllByUserId(userId);
        return categories.stream()
                        .map(category -> new CategoryDTO(
                            category.getId(), 
                            category.getTitle(),
                            category.getCardCount()))
                        .collect(Collectors.toList());        
    }     
    
    /**
     * Delete a category from the database
     * @param userId The ID of the user deleting the category
     * @param id ID of the category to delete
     * @return Response with result of deleting category
     */
    @Transactional
    public DeleteResponse deleteCategory(Integer userId, Integer id) {
        Optional<Category> optCategory = categoryRepository.findById(id);

        // Checks if the category exists
        if(!optCategory.isPresent()){
            throw new NotFoundException("Category not found.");
        }

        Category category = optCategory.get();
        // Checks if the user has permission to delete the category
        if(!category.getUser().getId().equals(userId)){
            throw new UnauthorizedUserException("Unauthorized: You do not have permission to delete this category.");
        }

        categoryRepository.deleteById(id);
        return new DeleteResponse("Category deleted."); 
        
    }   
    
    /**
     * Update a category's information in the database
     * @param userId The ID of the user updating the category
     * @param id ID of the category to update
     * @param request The category request object
     * @return Response with result of updating category
     */
    @Transactional
    public UpdateResponse updateCategory(Integer userId, Integer id, CategoryRequest request) {
        Optional<Category> optCategory = categoryRepository.findById(id);

        // Checks if the category exists
        if(!optCategory.isPresent()){
            throw new NotFoundException("Category not found.");
        }

        Category category = optCategory.get();
        // Checks if the user has permission to delete the category
        if(!category.getUser().getId().equals(userId)){
            throw new UnauthorizedUserException("Unauthorized: You do not have permission to update this category.");
        }        

        category.setTitle(request.getTitle());
        categoryRepository.save(category);
        return new UpdateResponse("Category updated.");
    }       

}