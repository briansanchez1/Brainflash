/**
 * This class contains unit tests for the CategoryController class.
 * It mocks the CategoryService dependency to isolate the controller for testing.
 */
package com.g5.brainflash.category;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.user.Role;
import com.g5.brainflash.user.User;

public class CategoryControllerTest {

    @InjectMocks
    private CategoryController categoryController;

    @Mock
    private CategoryService categoryService;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test case for saving a category.
     */
    @Test
    public void testSaveCategory() {
        // Prepare test data
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        CategoryRequest request = new CategoryRequest();
        request.setTitle("Test Category");

        // Mock the behavior of dependencies
        when(categoryService.saveCategory(any(), any())).thenReturn(new CategoryDTO());

        // Perform the test
        ResponseEntity<?> response = categoryController.saveCategory(user, request);

        // Assert the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test case for deleting a category.
     */
    @Test
    public void testDeleteCategory() {
        // Prepare test data
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        // Mock the behavior of dependencies
        when(categoryService.deleteCategory(anyInt(), anyInt()))
            .thenReturn(new DeleteResponse("Category deleted."));

        // Perform the test
        ResponseEntity<?> response = categoryController.deleteCategory(user, 1);

        // Assert the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test case for updating a category.
     */
    @Test
    public void testUpdateCategory() {
        // Prepare test data
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        CategoryRequest request = new CategoryRequest();
        request.setTitle("Test Category");

        // Mock the behavior of dependencies
        when(categoryService.updateCategory(anyInt(), anyInt(), any()))
            .thenReturn(new UpdateResponse("Category updated."));

        // Perform the test
        ResponseEntity<?> response = 
            categoryController.updateCategory(user, 1, request);

        // Assert the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test case for retrieving all categories.
     */
    @Test
    public void testGetAllCategories() {
        // Prepare test data
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        List<CategoryDTO> categories = new ArrayList<>();
        categories.add(new CategoryDTO(/* Mocked DTO */));

        // Mock the behavior of dependencies
        when(categoryService.getAllCategoriesByUserId(anyInt())).thenReturn(categories);

        // Perform the test
        ResponseEntity<?> response = categoryController.getallCategories(user);

        // Assert the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
