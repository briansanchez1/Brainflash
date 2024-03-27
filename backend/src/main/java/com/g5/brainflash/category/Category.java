package com.g5.brainflash.category;

import com.g5.brainflash.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Category class represents a category entity in the system.
 * Categories are used to organize flashcards.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {
    /**
     * The unique identifier for the category.
     */    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * The title of the category.
     */    
    private String title;

    /**
     * The user who created this category.
     * A category is associated with exactly one user.
     * CascadeType.REMOVE ensures that if the associated user is deleted, 
     * all categories associated with that user will also be removed.
     */    
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
}
