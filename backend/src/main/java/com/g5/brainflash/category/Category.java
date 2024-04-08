package com.g5.brainflash.category;

import java.util.List;

import com.g5.brainflash.flashcard.Flashcard;
import com.g5.brainflash.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @Column(name = "id")
    private Integer id;

    /**
     * The title of the category.
     */    
    private String title;

    // Number of cards in category. For use in PFE feature
    private Integer cardCount;

   /**
     * The user who created this category.
     * Many-to-one relationship where "user" is the owning side
     * A category is associated with exactly one user.
     */    
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Flashcard> flashcards;
}