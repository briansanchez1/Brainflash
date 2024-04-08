package com.g5.brainflash.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * UserRepository. Used to interact with the database for user data.
 */
public interface UserRepository extends JpaRepository<User, Integer>{

    Optional<User> findByEmail( String email ) ;

    boolean existsByEmail( String email ) ;

    void deleteById (Integer id);

}
