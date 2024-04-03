package com.g5.brainflash.flashcard;

import com.g5.brainflash.category.Category;
import com.g5.brainflash.deck.Deck;
import com.g5.brainflash.user.User;

import jakarta.persistence.Column;
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
 * Flashcard class. Represents a single flashcard.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "flashcard")
public class Flashcard {
    // Unique identifier for flashcard
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // Question and answer for flashcard
    private String question;
    private String answer;

    // User who created flashcard
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    
    // Optional deck flashcard belongs to
    @ManyToOne(optional = true)
    @JoinColumn(name = "deck_id", referencedColumnName = "id")
    private Deck deck;

    // Category flashcard belongs to
    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;
}
