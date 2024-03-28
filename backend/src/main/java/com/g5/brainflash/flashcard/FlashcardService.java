package com.g5.brainflash.flashcard;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.g5.brainflash.category.Category;
import com.g5.brainflash.category.CategoryRepository;
import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.user.User;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

/**
 * Flashcard service class. Handles logic relating to flashcards in system
 */
@Service
@RequiredArgsConstructor
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final CategoryRepository categoryRepository;

    /**
     * Build flashcard DTO to be saved
     * @param user The user creating/editing flashcard
     * @param request The flashcard request object
     * @return The flashcard DTO to be saved
     */
    @Transactional
    public FlashcardDTO saveFlashcard(User user, FlashcardRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                            .orElseThrow(() -> new EntityNotFoundException("Category not found."));

        Flashcard flashcard = Flashcard.builder()
            .question(request.getQuestion())
            .answer(request.getAnswer())
            .user(user)
            .category(category)
            //.deck(request.getDeck())
            .build();

        flashcardRepository.save(flashcard);

        return FlashcardDTO.builder()
            .id(flashcard.getId())
            .question(flashcard.getQuestion())
            .answer(flashcard.getAnswer())
            .categoryId(flashcard.getCategory().getId())
            //.deck(flashcard.getDeck())
            .build();
    }

    /**
     * Get all flashcards for a user
     * @param userId The ID of the user
     * @return List of all flashcard DTOs
     */
    @Transactional
    public List<FlashcardDTO> getAllFlashcardsByUserId(Integer userId) {
        List<Flashcard> flashcards = flashcardRepository.findAllByUserId(userId);
        return flashcards.stream()
                        .map(flashcard -> new FlashcardDTO(
                            flashcard.getId(), 
                            flashcard.getQuestion(),
                            flashcard.getAnswer(),
                            flashcard.getCategory().getId()))
                            //flashcard.getDeck()))
                        .collect(Collectors.toList());        
    }

    /**
     * Get all flashcards for a category
     * @param categoryId The ID of the category
     * @return List of all flashcard DTOs
     */
    @Transactional
    public List<FlashcardDTO> getAllFlashcardsByCategoryId(Integer categoryId) {
        List<Flashcard> flashcards = flashcardRepository.findAllByCategoryId(categoryId);
        return flashcards.stream()
                        .map(flashcard -> new FlashcardDTO(
                            flashcard.getId(), 
                            flashcard.getQuestion(),
                            flashcard.getAnswer(),
                            flashcard.getCategory().getId()))
                            //flashcard.getDeck()))
                        .collect(Collectors.toList());        
    }

    /**
     * Get all flashcards for a deck
     * @param deckId The ID of the deck
     * @return List of all flashcard DTOs
     */
    /*@Transactional
    public List<FlashcardDTO> getAllFlashcardsByDeckId(Integer deckId) {
        List<Flashcard> flashcards = flashcardRepository.findAllByDeckId(deckId);
        return flashcards.stream()
                        .map(flashcard -> new FlashcardDTO(
                            flashcard.getId(), 
                            flashcard.getQuestion(),
                            flashcard.getAnswer(),
                            flashcard.getCategoryId()))
                            //flashcard.getDeck()))
                        .collect(Collectors.toList());        
    }*/

    /**
     * Delete a flashcard from the database
     * @param userId The ID of the user
     * @param id The ID of the flashcard to delete
     * @return Response with result of deleting flashcard
     */
    @Transactional
    public DeleteResponse deleteFlashcard(Integer userId, Integer id) {
        Optional<Flashcard> optFlashcard = flashcardRepository.findById(id);

        // Checks if the flashcard exists
        if(!optFlashcard.isPresent()){
            throw new NotFoundException("Flashcard not found.");
        }

        Flashcard flashcard = optFlashcard.get();

        // Checks if the user owns the flashcard
        if(flashcard.getUser().getId() != userId){
            throw new UnauthorizedUserException("User is not authorized to delete this flashcard.");
        }

        flashcardRepository.delete(flashcard);

        return new DeleteResponse("Flashcard deleted successfully.");
    }

    /**
     * Update a flashcard in the database
     * @param userId The ID of the user
     * @param id The ID of the flashcard to update
     * @param request The flashcard request object
     * @return Response with result of updating flashcard
     */
    @Transactional
    public UpdateResponse updateFlashcard(Integer userId, Integer id, FlashcardRequest request) {
        Optional<Flashcard> optFlashcard = flashcardRepository.findById(id);

        // Checks if the flashcard exists
        if(!optFlashcard.isPresent()){
            throw new NotFoundException("Flashcard not found.");
        }

        Flashcard flashcard = optFlashcard.get();

        // Checks if the user owns the flashcard
        if(flashcard.getUser().getId() != userId){
            throw new UnauthorizedUserException("User is not authorized to update this flashcard.");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                            .orElseThrow(() -> new EntityNotFoundException("Category not found."));

        flashcard.setQuestion(request.getQuestion());
        flashcard.setAnswer(request.getAnswer());
        flashcard.setCategory(category);
        //flashcard.setDeck(request.getDeck());

        flashcardRepository.save(flashcard);

        return new UpdateResponse("Flashcard updated successfully.");
    }
}
