


package com.g5.brainflash.pfesession;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.user.User;

import lombok.RequiredArgsConstructor;

/**
 * 
 * 
 * @author Brian Sanchez
 * @version 1.0.0 2024-04-02 Initial implementation
 *
 */




/**
 * PFE session service class. Handles logic relating to PFE Sessions in system
 */
@Service
@RequiredArgsConstructor
public class PFESessionService {
    private final PFESessionRepository pfeSessionRepository; 

    /**
     * Build PFE session DTO to be saved
     * @param user The user creating/editing PFE
     * @param request The PFE request object
     * @return The PFE DTO to be saved
     */
    @Transactional
    public PFESessionDTO savePFESession(User user, PFESessionRequest request ) {
        PFESession pfeSession = PFESession.builder()
                                          .title( request.getTitle() )
                                          .startDate( request.getStartDate() )
                                          .endDate( request.getEndDate() )
//                                          .deck( request.getDeck() )
//                                          .category( request.getCategory() )
                                          .user( user )
                                          .build() ;

        pfeSession = pfeSessionRepository.save( pfeSession ) ;

        return PFESessionDTO.builder()
                            .id( pfeSession.getId() )
                            .title( pfeSession.getTitle() )
                            .startDate( pfeSession.getStartDate() )
                            .endDate( pfeSession.getEndDate() )
//                            .deck( request.getDeck() )
//                            .category( request.getCategory() )
                            .build() ;
    }    

    /**
     * Get all pfe sessions for a user
     * @param userId The ID of the user
     * @return List of all pfe session DTOs
     */
    @Transactional
    public List<PFESessionDTO> getAllPFESessionsByUserId(Integer userId) {
        List<PFESession> pfeSessions = pfeSessionRepository.findAllByUserId(userId);
        return pfeSessions.stream()
                          .map( pfeSession -> new PFESessionDTO( pfeSession.getId(),
                                                                 pfeSession.getTitle(),
                                                                 pfeSession.getStartDate(),
                                                                 pfeSession.getEndDate()
                                                                /* pfeSession.getDeck(), 
                                                                 pfeSession.getCategory() */) )
                          .collect( Collectors.toList() ) ;
    
    }     
    
    /**
     * Delete a pfe session from the database
     * @param userId The ID of the user deleting the pfe session
     * @param id ID of the pfe session to delete
     * @return Response with result of deleting pfe session
     */
    @Transactional
    public DeleteResponse deletePFESession(Integer userId, Integer id) {
        Optional<PFESession> optPFESession = pfeSessionRepository.findById(id);

        // Checks if the pfe session exists
        if(!optPFESession.isPresent()){
            throw new NotFoundException("PFE session not found.");
        }

        PFESession pfeSession = optPFESession.get();
        // Checks if the user has permission to delete the pfe session
        if(!pfeSession.getUser().getId().equals(userId)){
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
        Optional<PFESession> optPFESession = pfeSessionRepository.findById(id);

        // Checks if the pfe session exists
        if(!optPFESession.isPresent()){
            throw new NotFoundException("PFE session not found.");
        }

        PFESession pfeSession = optPFESession.get();
        // Checks if the user has permission to delete the pfe session
        if(!pfeSession.getUser().getId().equals(userId)){
            throw new UnauthorizedUserException("Unauthorized: You do not have permission to update this PFE session.");
        }        

        pfeSession.setTitle(request.getTitle());
        pfeSessionRepository.save(pfeSession);
        return new UpdateResponse("PFE session updated.");
    }       

}