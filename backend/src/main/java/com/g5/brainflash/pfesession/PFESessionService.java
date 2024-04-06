package com.g5.brainflash.pfesession;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.g5.brainflash.category.Category;
import com.g5.brainflash.category.CategoryRepository;
import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.deck.Deck;
import com.g5.brainflash.deck.DeckRepository;
import com.g5.brainflash.user.User;

import lombok.RequiredArgsConstructor;

/**
 * PFE session service class. Handles logic relating to PFE Sessions in system
 */
@Service
@RequiredArgsConstructor
public class PFESessionService {

    private final PFESessionRepository pfeSessionRepository;
    private final CategoryRepository categoryRepository;
    private final DeckRepository deckRepository;

    /**
     * Build PFE session DTO to be saved
     * 
     * @param user
     *     The user creating/editing PFE
     * @param request
     *     The PFE request object
     * 
     * @return The PFE DTO to be saved
     */
    @Transactional
    public PFESessionDTO savePFESession(User user,
        PFESessionRequest request) {

        if((request.getDeckId() == null && request.getCategoryId() == null) ||
         (request.getDeckId() != null && request.getCategoryId() != null)){
            throw new RuntimeException("Either a deck id or a category id is required.");
        }

        Deck deck = null;
        if (request.getDeckId() != null) {
             deck = deckRepository.findById(request.getDeckId())
                .orElseThrow(() -> new EntityNotFoundException("Deck not found."));
        }

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found."));
        }


        PFESession pfeSession = PFESession.builder()
        .title(request.getTitle())
        .startDate(request.getStartDate())
        .endDate(request.getEndDate())
        .deck(deck)
        .category(category)
        .user(user)
        .build();

        pfeSession = pfeSessionRepository.save(pfeSession);
        Integer categoryId = pfeSession.getCategory() != null ? pfeSession.getCategory().getId() : null;
        Integer deckId = pfeSession.getDeck() != null ? pfeSession.getDeck().getId() : null;


        return PFESessionDTO.builder()
            .id(pfeSession.getId())
            .title(pfeSession.getTitle())
            .startDate(pfeSession.getStartDate())
            .endDate(pfeSession.getEndDate())
            .deckId(deckId)
            .categoryId(categoryId)
            .build();            

    }

    /**
     * Get all pfe sessions for a user
     * @param userId The ID of the user
     * @return List of all pfe session DTOs
     */
    @Transactional
    public List < PFESessionDTO > getAllPFESessionsByUserId(Integer userId) {
        List < PFESession > pfeSessions = pfeSessionRepository.findAllByUserId(userId);
        return pfeSessions.stream()
            .map(pfeSession -> {
                Integer categoryId = pfeSession.getCategory() != null ? pfeSession.getCategory().getId() : null;
                return new PFESessionDTO(pfeSession.getId(),
                    pfeSession.getTitle(),
                    pfeSession.getStartDate(),
                    pfeSession.getEndDate(),
                    pfeSession.getDeck().getId(),
                    categoryId);
            })
            .collect(Collectors.toList());

    }

    /**
     * Delete a pfe session from the database
     * @param userId The ID of the user deleting the pfe session
     * @param id ID of the pfe session to delete
     * @return Response with result of deleting pfe session
     */
    @Transactional
    public DeleteResponse deletePFESession(Integer userId, Integer id) {
        Optional < PFESession > optPFESession = pfeSessionRepository.findById(id);

        // Checks if the pfe session exists
        if (!optPFESession.isPresent()) {
            throw new NotFoundException("PFE session not found.");
        }

        PFESession pfeSession = optPFESession.get();
        // Checks if the user has permission to delete the pfe session
        if (!pfeSession.getUser().getId().equals(userId)) {
            throw new UnauthorizedUserException("Unauthorized: You do not have permission to delete this PFE session.");
        }

        pfeSessionRepository.deleteById(id);
        return new DeleteResponse("PFE session deleted.");

    }

    /**
     * Update a pfe session's information in the database
     * @param userId The ID of the user updating the pfe session
     * @param id ID of the pfe session to update
     * @param request The pfe session request object
     * @return Response with result of updating pfe session
     */
    @Transactional
    public UpdateResponse updatePFESession(Integer userId, Integer id, PFESessionRequest request) {
        Optional < PFESession > optPFESession = pfeSessionRepository.findById(id);

        // Checks if the pfe session exists
        if (!optPFESession.isPresent()) {
            throw new NotFoundException("PFE session not found.");
        }

        PFESession pfeSession = optPFESession.get();
        // Checks if the user has permission to delete the pfe session
        if (!pfeSession.getUser().getId().equals(userId)) {
            throw new UnauthorizedUserException("Unauthorized: You do not have permission to update this PFE session.");
        }

        Deck deck = deckRepository.findById(request.getDeckId())
            .orElseThrow(() -> new EntityNotFoundException("Deck not found."));

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found."));
        }

        pfeSession.setTitle(request.getTitle());
        pfeSession.setStartDate(request.getStartDate());
        pfeSession.setEndDate(request.getEndDate());
        pfeSession.setDeck(deck);
        pfeSession.setCategory(category);

        pfeSessionRepository.save(pfeSession);
        return new UpdateResponse("PFE session updated.");
    }

}