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

import com.g5.brainflash.category.Category ;
import com.g5.brainflash.category.CategoryRepository ;
import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.deck.Deck ;
import com.g5.brainflash.deck.DeckRepository ;
import com.g5.brainflash.user.User;

public class PFESessionServiceTest {

    @InjectMocks
    private PFESessionService pfeSessionService ;

    @Mock
    private PFESessionRepository pfeSessionRepository ;

    @Mock
    private CategoryRepository categoryRepository ;
    
    @Mock
    private DeckRepository deckRepository ;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test case for saving a pfe session.
     */
    @Test
    public void testSavePFESession()  {
        // Prepare test data
        User user = new User() ;
        user.setId( 1 ) ;

        PFESessionRequest request = new PFESessionRequest() ;
        request.setTitle( "Test PFE Session" ) ;
        request.setStartDate( LocalDate.now() ) ;
        request.setEndDate( LocalDate.now().plusDays( 7 ) ) ;
        request.setDeckId( 1 ) ;
        request.setCategoryId( 1 ) ;

        Deck deck = new Deck() ;
        deck.setId( 1 ) ;

        Category category = new Category() ;
        category.setId( 1 ) ;

        when( deckRepository.findById( request.getDeckId() ) ).thenReturn( Optional.of( deck ) ) ;
        when( categoryRepository.findById( request.getCategoryId() ) ).thenReturn( Optional.of( category ) ) ;

        PFESession savedPfeSession = new PFESession() ;
        savedPfeSession.setId( 1 ) ;
        savedPfeSession.setTitle( "Test PFE Session" ) ;
        savedPfeSession.setStartDate( LocalDate.now() ) ;
        savedPfeSession.setEndDate( LocalDate.now().plusDays( 7 ) ) ;
        savedPfeSession.setDeck( deck ) ;
        savedPfeSession.setCategory( category ) ;
        savedPfeSession.setUser( user ) ;

        when( pfeSessionRepository.save( any( PFESession.class ) ) ).thenReturn( savedPfeSession ) ;

        // Perform test
        PFESessionDTO result = pfeSessionService.savePFESession( user, request ) ;

        // Assert result
        assertEquals( savedPfeSession.getId(), result.getId() ) ;
        assertEquals( savedPfeSession.getTitle(), result.getTitle() ) ;
        assertEquals( savedPfeSession.getStartDate(), result.getStartDate() ) ;
        assertEquals( savedPfeSession.getEndDate(), result.getEndDate() ) ;
        assertEquals( savedPfeSession.getDeck().getId(), result.getDeckId() ) ;
        assertEquals( savedPfeSession.getCategory().getId(), result.getCategoryId() ) ;

        // Verify interactions with dependencies
        verify( deckRepository, times( 1 ) ).findById( request.getDeckId() ) ;
        verify( categoryRepository, times( 1 ) ).findById( request.getCategoryId() ) ;
        verify( pfeSessionRepository, times( 1 ) ).save( any( PFESession.class ) ) ;

        }

    /**
     * Test case for retrieving all pfe sessions by user ID.
     */
    @Test
    public void testGetAllPFESessionsByUserId() {
        // Prepare test data
        User user = new User();
        user.setId(1);

        Deck deck = new Deck();  // Create a non-null Deck object
        deck.setId(1);

        Category category = new Category();  // Create a non-null Deck object
        category.setId(1);
        
        
        
        PFESession savedPfeSession1 = new PFESession() ;  savedPfeSession1.setId( 1 ) ;
        savedPfeSession1.setTitle( "Test PFE Session 1" ) ;
        savedPfeSession1.setStartDate( LocalDate.now().plusDays( 2 ) ) ;
        savedPfeSession1.setEndDate( LocalDate.now().plusDays( 7 ) ) ;
        savedPfeSession1.setDeck( deck ) ;
        savedPfeSession1.setCategory( category ) ;
        savedPfeSession1.setUser( user ) ;
        
        
        PFESession savedPfeSession2 = new PFESession() ;  savedPfeSession2.setId( 1 ) ;
        savedPfeSession2.setTitle( "Test PFE Session 2" ) ;
        savedPfeSession2.setStartDate( LocalDate.now() ) ;
        savedPfeSession2.setEndDate( LocalDate.now().plusDays( 7 ) ) ;
        savedPfeSession2.setDeck( deck ) ;
        savedPfeSession2.setCategory( category ) ;
        savedPfeSession2.setUser( user ) ;
        
        List<PFESession> pfeSessions = new ArrayList<>();
        pfeSessions.add(savedPfeSession1);
        pfeSessions.add(savedPfeSession2);

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
        Integer userId = 1 ;
        Integer pfeSessionId = 1 ;
        Integer updatedDeckId = 2 ;
        Integer updatedCategoryId = 2 ;

        User user = new User() ;
        user.setId( userId ) ;

        Deck originalDeck = new Deck() ;
        originalDeck.setId( 1 ) ;

        Deck updatedDeck = new Deck() ;
        updatedDeck.setId( updatedDeckId ) ;

        Category originalCategory = new Category() ;
        originalCategory.setId( 1 ) ;

        Category updatedCategory = new Category() ;
        updatedCategory.setId( updatedCategoryId ) ;

        PFESessionRequest request = new PFESessionRequest() ;
        request.setTitle( "Updated Title" ) ;
        request.setStartDate( LocalDate.of( 3000, 2, 2 ) ) ;
        request.setEndDate( LocalDate.of( 3001, 2, 2 ) ) ;
        request.setDeckId( updatedDeckId ) ;
        request.setCategoryId( updatedCategoryId ) ;

        PFESession pfeSession = new PFESession() ;
        pfeSession.setId( pfeSessionId ) ;
        pfeSession.setTitle( "Original Title" ) ;
        pfeSession.setStartDate( LocalDate.of( 2024, 04, 4 ) ) ;
        pfeSession.setEndDate( LocalDate.of( 2024, 04, 15 ) ) ;
        pfeSession.setUser( user ) ;
        pfeSession.setDeck( originalDeck ) ;
        pfeSession.setCategory( originalCategory ) ;

        // Mock the behavior of dependencies
        when( pfeSessionRepository.findById( pfeSessionId ) ).thenReturn( Optional.of( pfeSession ) ) ;
        when( deckRepository.findById( updatedDeckId ) ).thenReturn( Optional.of( updatedDeck ) ) ;
        when( categoryRepository.findById( updatedCategoryId ) ).thenReturn( Optional.of( updatedCategory ) ) ;
        when( pfeSessionRepository.save( any( PFESession.class ) ) ).thenReturn( pfeSession ) ;

        // Perform the test
        UpdateResponse response = pfeSessionService.updatePFESession( userId,
                                                                      pfeSessionId,
                                                                      request ) ;

        // Assert the result
        assertEquals( "PFE session updated.", response.getMessage() ) ;
        assertEquals( request.getTitle(), pfeSession.getTitle() ) ;
        assertEquals( request.getStartDate(), pfeSession.getStartDate() ) ;
        assertEquals( request.getEndDate(), pfeSession.getEndDate() ) ;
        assertEquals( updatedDeckId, pfeSession.getDeck().getId() ) ;
        assertEquals( updatedCategoryId, pfeSession.getCategory().getId() ) ;

        // Verify interactions with dependencies
        verify( pfeSessionRepository, times( 1 ) ).findById( pfeSessionId ) ;
        verify( deckRepository, times( 1 ) ).findById( updatedDeckId ) ;
        verify( categoryRepository, times( 1 ) ).findById( updatedCategoryId ) ;
        verify( pfeSessionRepository, times( 1 ) ).save( any( PFESession.class ) ) ;

        }

}
