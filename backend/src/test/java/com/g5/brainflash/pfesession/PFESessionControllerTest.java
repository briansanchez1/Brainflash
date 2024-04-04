/**
 * This class contains unit tests for the PFESessionController class.
 * It mocks the PFESessionService dependency to isolate the controller for testing.
 */
package com.g5.brainflash.pfesession;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.time.LocalDate ;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.user.Role;
import com.g5.brainflash.user.User;

public class PFESessionControllerTest {

    @InjectMocks
    private PFESessionController pfeSessionController;

    @Mock
    private PFESessionService pfeSessionService;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test case for saving a pfe session.
     */
    @Test
    public void testSavePFESession() {
        // Prepare test data
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        PFESessionRequest request = new PFESessionRequest();
        request.setTitle("Test PFE");
        request.setStartDate( LocalDate.now().plusDays( 3 ) );
        request.setEndDate( LocalDate.now().plusDays( 4 ) );
        request.setDeckId( 1 );
        request.setCategoryId( 2 );

        // Mock the behavior of dependencies
        when(pfeSessionService.savePFESession(any(), any())).thenReturn(new PFESessionDTO());

        // Perform the test
        ResponseEntity<?> response = pfeSessionController.savePFESession(user, request);

        // Assert the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test case for deleting a pfe session.
     */
    @Test
    public void testDeletePFESession() {
        // Prepare test data
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        // Mock the behavior of dependencies
        when(pfeSessionService.deletePFESession(anyInt(), anyInt()))
            .thenReturn(new DeleteResponse("PFE deleted."));

        // Perform the test
        ResponseEntity<?> response = pfeSessionController.deletePFESession(user, 1);

        // Assert the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test case for updating a pfe session.
     */
    @Test
    public void testUpdatePFESession() {
        // Prepare test data
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        PFESessionRequest request = new PFESessionRequest();
        request.setTitle("Test PFE");
        request.setStartDate( LocalDate.now().plusDays( 3 ) );
        request.setEndDate( LocalDate.now().plusDays( 4 ) );
        request.setDeckId( 1 );
        request.setCategoryId( null );

        // Mock the behavior of dependencies
        when(pfeSessionService.updatePFESession(anyInt(), anyInt(), any()))
            .thenReturn(new UpdateResponse("PFE updated."));

        // Perform the test
        ResponseEntity<?> response = 
            pfeSessionController.updatePFESession(user, 1, request);

        // Assert the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test case for retrieving all PFE Sessions.
     */
    @Test
    public void testGetAllPFESessions() {
        // Prepare test data
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        List<PFESessionDTO> pfeSessions = new ArrayList<>();
        pfeSessions.add(new PFESessionDTO(/* Mocked DTO */));

        // Mock the behavior of dependencies
        when(pfeSessionService.getAllPFESessionsByUserId(anyInt())).thenReturn(pfeSessions);

        // Perform the test
        ResponseEntity<?> response = pfeSessionController.getallPFESessions(user);

        // Assert the result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
