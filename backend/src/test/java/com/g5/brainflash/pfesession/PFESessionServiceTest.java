/**
 * This class contains unit tests for the PFESessionService class.
 * It utilizes Mockito for mocking dependencies such as the PFESessionRepository.
 */
package com.g5.brainflash.pfesession;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate ;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.user.User;

public class PFESessionServiceTest {

    @InjectMocks
    private PFESessionService pfeSessionService;

    @Mock
    private PFESessionRepository pfeSessionRepository;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test case for saving a pfe session.
     */
    @Test
    public void testSavePFESession(){
        // Prepare test data
        User user = new User();
        PFESessionRequest request = new PFESessionRequest();
        request.setTitle("Test PFE session");

        PFESession savedPFESessions = new PFESession();
        savedPFESessions.setId(1);
        savedPFESessions.setTitle("Test PFE session");
        savedPFESessions.setStartDate( LocalDate.now() );
        savedPFESessions.setEndDate( LocalDate.of( 2024, 4, 14 ) );
        savedPFESessions.setUser(user);

        // Mock the behavior of dependencies
        when(pfeSessionRepository.save(any(PFESession.class))).thenReturn(savedPFESessions);

        // Perform the test
        PFESessionDTO result = pfeSessionService.savePFESession(user, request);

        // Assert the result
        assertEquals(savedPFESessions.getId(), result.getId());
        assertEquals(savedPFESessions.getTitle(), result.getTitle());
        assertEquals(savedPFESessions.getStartDate(), result.getStartDate());
        assertEquals(savedPFESessions.getEndDate(), result.getEndDate());
        

        // Verify interactions with dependencies
        verify(pfeSessionRepository, times(1)).save(any(PFESession.class));
    }

    /**
     * Test case for retrieving all pfe sessions by user ID.
     */
    @Test
    public void testGetAllPFESessionsByUserId() {
        // Prepare test data
        User user = new User();
        user.setId(1);

        List<PFESession> pfeSessions = new ArrayList<>();
        pfeSessions.add(new PFESession(1, "pfe session 1", null, null, user));
        pfeSessions.add(new PFESession(2, "pfe session 2", null, null, user));

        // Mock the behavior of dependencies
        when(pfeSessionRepository.findAllByUserId(user.getId())).thenReturn(pfeSessions);

        // Perform the test
        List<PFESessionDTO> result = pfeSessionService.getAllPFESessionsByUserId(user.getId());

        // Assert the result
        assertEquals(pfeSessions.size(), result.size());
        for (int i = 0; i < pfeSessions.size(); i++) {
            assertEquals(pfeSessions.get(i).getId(), result.get(i).getId());
            assertEquals(pfeSessions.get(i).getTitle(), result.get(i).getTitle());
            assertEquals(pfeSessions.get(i).getUser().getId(), user.getId());
        }

        // Verify interactions with dependencies
        verify(pfeSessionRepository, times(1)).findAllByUserId(user.getId());
    }    

    /**
     * Test case for deleting a pfe session.
     */
    @Test
    public void testDeletePFESession() {
        // Prepare test data
        Integer userId = 1;
        Integer pfeSessionId = 1;
        User user = new User();
        user.setId(userId);

        PFESession pfeSession = new PFESession();
        pfeSession.setId(pfeSessionId);
        pfeSession.setUser(user);

        // Mock the behavior of dependencies
        when(pfeSessionRepository.findById(pfeSessionId)).thenReturn(Optional.of(pfeSession));

        // Perform the test
        DeleteResponse response = pfeSessionService.deletePFESession(userId, pfeSessionId);

        // Assert the result
        assertEquals("PFE session deleted.", response.getMessage());

        // Verify interactions with dependencies
        verify(pfeSessionRepository, times(1)).deleteById(pfeSessionId);
    }  
    
    /**
     * Test case for handling scenario when deleting a pfe session not found.
     */
    @Test
    public void testDeletePFESessionNotFound() {
        // Prepare test data
        Integer userId = 1;
        Integer pfeSessionId = 1;

        // Mock the behavior of dependencies
        when(pfeSessionRepository.findById(pfeSessionId)).thenReturn(Optional.empty());

        // Perform the test and expect NotFoundException
        assertThrows(NotFoundException.class,
         () -> pfeSessionService.deletePFESession(userId, pfeSessionId));
    }

    /**
     * Test case for handling scenario when deleting a pfe session unauthorized.
     */
    @Test
    public void testDeletePFESessionUnauthorized() {
        // Prepare test data
        Integer userId = 1;
        Integer pfeSessionId = 1;
        Integer differentUserId = 2;

        User user = new User();
        user.setId(differentUserId);

        PFESession pfeSession = new PFESession();
        pfeSession.setId(pfeSessionId);
        pfeSession.setUser(user);

        // Mock the behavior of dependencies
        when(pfeSessionRepository.findById(pfeSessionId)).thenReturn(Optional.of(pfeSession));

        // Perform the test and expect UnauthorizedUserException
        assertThrows(UnauthorizedUserException.class,
         () -> pfeSessionService.deletePFESession(userId, pfeSessionId));
    }    

    /**
     * Test case for updating a pfe session.
     */
    @Test
    public void testUpdatePFESession() {
        // Prepare test data
        Integer userId = 1;
        Integer pfeSessionId = 1;
        User user = new User();
        user.setId(userId);

        PFESessionRequest request = new PFESessionRequest();
        request.setTitle("Updated Title");

        PFESession pfeSession = new PFESession();
        pfeSession.setId(pfeSessionId);
        pfeSession.setTitle("Original Title");
        pfeSession.setUser(user);

        // Mock the behavior of dependencies
        when(pfeSessionRepository.findById(pfeSessionId)).thenReturn(Optional.of(pfeSession));
        when(pfeSessionRepository.save(any(PFESession.class))).thenReturn(pfeSession);

        // Perform the test
        UpdateResponse response = pfeSessionService.updatePFESession(userId, pfeSessionId, request);

        // Assert the result
        assertEquals("PFE session updated.", response.getMessage());
        assertEquals(request.getTitle(), pfeSession.getTitle());

        // Verify interactions with dependencies
        verify(pfeSessionRepository, times(1)).save(any(PFESession.class));
    }    
}
