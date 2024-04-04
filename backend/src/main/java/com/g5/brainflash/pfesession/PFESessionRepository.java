package com.g5.brainflash.pfesession;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * PFE Session repository interface. Used to interact with the database for PFE-related purposes.
 */
public interface PFESessionRepository extends JpaRepository<PFESession, Integer>{

    /**
     * Finds all PFE Sessions of a given user based on their user id
     * 
     * @param userId
     *     - the ID of the user
     * 
     * @return a list of all the PFE that is connected to the user
     */
    List<PFESession> findAllByUserId( Integer userId ) ;

    /*
     * Finds the PFE Session given the PFE Session ID
     */
    @Override
    Optional<PFESession> findById( Integer id ) ;

    /*
     * Deletes the PFE Session given the PFE session ID.
     */
    @Override
    void deleteById( Integer pfeSessionId ) ;
}