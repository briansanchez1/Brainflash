package com.g5.brainflash.pfesession;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * PFE Session repository interface. Used to interact with the database for PFE-related purposes.
 */
public interface PFESessionRepository extends JpaRepository<PFESession, Integer>{

    List<PFESession> findAllByUserId( Integer userId ) ;

    Optional<PFESession> findById( Integer id ) ;

    void deleteById( Integer pfeSessionId ) ;
}