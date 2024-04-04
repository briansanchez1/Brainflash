/**
 * This class contains unit tests for the CategoryService class.
 * It utilizes Mockito for mocking dependencies such as the CategoryRepository.
 */
package com.g5.brainflash.category;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.user.User;

public class CategoryServiceTest {

    @InjectMocks
    private CategoryService categoryService;

    @Mock
    private CategoryRepository categoryRepository;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test case for saving a category.
     */
    @Test
    public void testSaveCategory(){
        // Prepare test data
        User user = new User();
        CategoryRequest request = new CategoryRequest();
        request.setTitle("Test Category");

        Category savedCategory = new Category();
        savedCategory.setId(1);
        savedCategory.setTitle("Test Category");
        savedCategory.setUser(user);

        // Mock the behavior of dependencies
        when(categoryRepository.save(any(Category.class))).thenReturn(savedCategory);

        // Perform the test
        CategoryDTO result = categoryService.saveCategory(user, request);

        // Assert the result
        assertEquals(savedCategory.getId(), result.getId());
        assertEquals(savedCategory.getTitle(), result.getTitle());

        // Verify interactions with dependencies
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    /**
     * Test case for retrieving all categories by user ID.
     */
    @Test
    public void testGetAllCategoriesByUserId() {
        // Prepare test data
        User user = new User();
        user.setId(1);

        List<Category> categories = new ArrayList<>();
        categories.add(new Category(1, "Category 1", 0, user));
        categories.add(new Category(2, "Category 2", 0, user));

        // Mock the behavior of dependencies
        when(categoryRepository.findAllByUserId(user.getId())).thenReturn(categories);

        // Perform the test
        List<CategoryDTO> result = categoryService.getAllCategoriesByUserId(user.getId());

        // Assert the result
        assertEquals(categories.size(), result.size());
        for (int i = 0; i < categories.size(); i++) {
            assertEquals(categories.get(i).getId(), result.get(i).getId());
            assertEquals(categories.get(i).getTitle(), result.get(i).getTitle());
            assertEquals(categories.get(i).getCardCount(), result.get(i).getCardCount());
            assertEquals(categories.get(i).getUser().getId(), user.getId());
        }

        // Verify interactions with dependencies
        verify(categoryRepository, times(1)).findAllByUserId(user.getId());
    }    

    /**
     * Test case for deleting a category.
     */
    @Test
    public void testDeleteCategory() {
        // Prepare test data
        Integer userId = 1;
        Integer categoryId = 1;
        User user = new User();
        user.setId(userId);

        Category category = new Category();
        category.setId(categoryId);
        category.setUser(user);

        // Mock the behavior of dependencies
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));

        // Perform the test
        DeleteResponse response = categoryService.deleteCategory(userId, categoryId);

        // Assert the result
        assertEquals("Category deleted.", response.getMessage());

        // Verify interactions with dependencies
        verify(categoryRepository, times(1)).deleteById(categoryId);
    }  
    
    /**
     * Test case for handling scenario when deleting a category not found.
     */
    @Test
    public void testDeleteCategoryNotFound() {
        // Prepare test data
        Integer userId = 1;
        Integer categoryId = 1;

        // Mock the behavior of dependencies
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

        // Perform the test and expect NotFoundException
        assertThrows(NotFoundException.class,
         () -> categoryService.deleteCategory(userId, categoryId));
    }

    /**
     * Test case for handling scenario when deleting a category unauthorized.
     */
    @Test
    public void testDeleteCategoryUnauthorized() {
        // Prepare test data
        Integer userId = 1;
        Integer categoryId = 1;
        Integer differentUserId = 2;

        User user = new User();
        user.setId(differentUserId);

        Category category = new Category();
        category.setId(categoryId);
        category.setUser(user);

        // Mock the behavior of dependencies
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));

        // Perform the test and expect UnauthorizedUserException
        assertThrows(UnauthorizedUserException.class,
         () -> categoryService.deleteCategory(userId, categoryId));
    }    

    /**
     * Test case for updating a category.
     */
    @Test
    public void testUpdateCategory() {
        // Prepare test data
        Integer userId = 1;
        Integer categoryId = 1;
        User user = new User();
        user.setId(userId);

        CategoryRequest request = new CategoryRequest();
        request.setTitle("Updated Title");

        Category category = new Category();
        category.setId(categoryId);
        category.setTitle("Original Title");
        category.setUser(user);

        // Mock the behavior of dependencies
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        // Perform the test
        UpdateResponse response = categoryService.updateCategory(userId, categoryId, request);

        // Assert the result
        assertEquals("Category updated.", response.getMessage());
        assertEquals(request.getTitle(), category.getTitle());

        // Verify interactions with dependencies
        verify(categoryRepository, times(1)).save(any(Category.class));
    }    
}
