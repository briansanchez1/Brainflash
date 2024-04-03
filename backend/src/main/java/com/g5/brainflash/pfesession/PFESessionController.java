package com.g5.brainflash.pfesession;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g5.brainflash.common.responses.ErrorResponse;
import com.g5.brainflash.user.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * PFESession controller class. Handles requests related to PFE sessions in system.
 */
@RestController
@RequestMapping("/api/v1/pfe")
@RequiredArgsConstructor
public class PFESessionController {

    private final PFESessionService pfeSessionService;
    
    /**
     * Save a PFE Session to the database
     * @param user The user creating/editing pfe
     * @param request The pfe request object
     * @return Response with result of saving pfe
     */
    @PostMapping("/add")
    public ResponseEntity<?> savePFESession(
        @AuthenticationPrincipal User user, @Valid @RequestBody PFESessionRequest request
    ) {
        return ResponseEntity.ok(pfeSessionService.savePFESession(user, request));
    }    

    /**
     * Delete a pfe session from the database
     * @param user The user deleting the pfe session
     * @param id ID of the pfe session to delete
     * @return  Response with result of deleting pfe session
     */
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deletePFESession(
        @AuthenticationPrincipal User user, @PathVariable Integer id
    ) {
        return ResponseEntity.ok(pfeSessionService.deletePFESession(user.getId(), id));
    }

    /**
     * Update a pfe session's information in the database
     * @param user The user owning the pfe session to be updated
     * @param id ID of the pfe session to update
     * @param request The pfe session request object
     * @return Response with result of updating pfe session
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePFESession(
        @AuthenticationPrincipal User user, 
        @PathVariable Integer id, 
        @RequestBody PFESessionRequest request
    ) {
        return ResponseEntity.ok(pfeSessionService.updatePFESession(user.getId(), id, request));
    }    
    
    /**
     * Get all pfe sessions for a user
     * @param user The user to get pfe sessions for
     * @return Response with list of pfe sessions
     */
    @GetMapping
    public ResponseEntity<?> getallPFESessions(
        @AuthenticationPrincipal User user
    ) {
        try {
            return ResponseEntity.ok(pfeSessionService.getAllPFESessionsByUserId(user.getId()));
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }    
}