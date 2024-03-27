package com.g5.brainflash.category;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.g5.brainflash.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository; 

    @Transactional
    public CategoryDTO saveCategory(User user, CategoryRequest request ) {
        Category category = Category.builder().title(request.getTitle()).user(user).build();

        categoryRepository.save(category);

        return CategoryDTO.builder()
            .id(category.getId())
            .title(category.getTitle())
            .build();
    }    

    @Transactional
    public List<CategoryDTO> getAllCategoriesByUserId(Integer userId) {
        List<Category> categories = categoryRepository.findAllByUserId(userId);
        return categories.stream()
                        .map(category -> new CategoryDTO(
                            category.getId(), 
                            category.getTitle()))
                        .collect(Collectors.toList());        
    }     
    
    @Transactional
    public String deleteCategory(Integer userId, Integer id) {
        Optional<Category> optCategory = categoryRepository.findById(id);

        // Checks if the category exists
        if(!optCategory.isPresent()){
            return "Category not found.";
        }

        Category category = optCategory.get();
        // Checks if the user has permission to delete the category
        if(!category.getUser().getId().equals(userId)){
            return "Unauthorized: You do not have permission to delete this category.";
        }

        categoryRepository.deleteById(id);
        return "Category deleted."; 
        
    }   
    
    @Transactional
    public String updateCategory(Integer userId, Integer id, CategoryRequest request) {
        Optional<Category> optCategory = categoryRepository.findById(id);

        // Checks if the category exists
        if(!optCategory.isPresent()){
            return "Category not found.";
        }

        Category category = optCategory.get();
        // Checks if the user has permission to delete the category
        if(!category.getUser().getId().equals(userId)){
            return "Unauthorized: You do not have permission to update this category.";
        }        

        category.setTitle(request.getTitle());
        categoryRepository.save(category);
        return "Category Updated."; 
    }       

}
