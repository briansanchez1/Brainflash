package com.g5.brainflash.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Category request object. Used to create and update categories
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    @NotBlank(message = "Title is required")    
    @Size(
        min = 2,
        max = 19,
        message = "Title must be between {min} and {max} characters long.")
    private String title;
}