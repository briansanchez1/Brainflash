package com.g5.brainflash.pfesession;

//import com.g5.brainflash.category.Category ;
//import com.g5.brainflash.deck.Deck ;
//import com.g5.brainflash.flashcard.Flashcard ;
import com.g5.brainflash.user.User;

import java.time.LocalDate ;

import io.micrometer.common.lang.Nullable ;
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
 * The PFE Session class represents a PFE Session entity in the system.
 * PFE Sessions are used to organize flashcards.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PFE_Session")
public class PFESession {
    /**
     * The unique identifier for the PFE Session.
     */    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    /**
     * The title of the PFE Session.
     */    
    private String title;

    /*
     * The first day to start reviewing for the exam.
     */
    private LocalDate startDate ;

    /*
     * The last day to review for the exam.
     */
    private LocalDate endDate ;

    /*
     * Flashards included in a PFE Session. Many flashcards can be in many PFE
     * Sessions. A session can only contain one Categoty.
     */
//    @ManyToOne(optional = false)
//    @JoinColumn( name = "category_id", referencedColumnName = "id" )
//    private Category category ;
    
    /*
     * Flashards included in a PFE Session. Many flashcards can be in many PFE
     * Sessions
     */
//    @Nullable
//    @ManyToOne(optional = false)
//     @JoinColumn(name = "deck_id", referencedColumnName = "id")
//     private Deck deck;
    
    
    /**
     * The user who created a PFE Session. Many-to-one relationship where "user" is
     * the owning side. A PFE Session is associated with exactly one user.
     */    

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}