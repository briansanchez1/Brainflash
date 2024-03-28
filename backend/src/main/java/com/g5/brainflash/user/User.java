/**
 * Represents a user entity in the brainflash application.
 * This class implements the UserDetails interface from Spring Security
 * to facilitate user authentication and authorization.
 */
package com.g5.brainflash.user;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import com.g5.brainflash.flashcard.Flashcard;
import com.g5.brainflash.category.Category;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {
    
    /** The unique identifier for the user. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    /** The name of the user. */
    private String name;
    
    /** The email address of the user. */
    private String email;
    
    /** The password of the user. */
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Flashcard> flashcards;

    /*@OneToMany(mappedBy = "deck")
    private List<Deck> decks;*/
    
    /** 
     * The list of categories associated with the user.
     * Each user can have multiple categories.
     */
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Category> categories;      
    
    /** The role of the user, such as ADMIN or USER. */
    @Enumerated(EnumType.STRING)
    private Role role;
    
    /**
     * Retrieves the authorities granted to the user.
     * @return A collection of granted authorities.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    
    /**
     * Retrieves the username of the user, which is their email address.
     * @return The email address of the user.
     */
    @Override
    public String getUsername() {
        return email;
    }
    
    /**
     * Retrieves the password of the user.
     * @return The password of the user.
     */
    @Override
    public String getPassword() {
        return password;
    }    
    
    /**
     * Indicates whether the user's account has expired.
     * @return Always returns true, indicating that the account never expires.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    /**
     * Indicates whether the user's account is locked or not.
     * @return Always returns true, indicating that the account is never locked.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    /**
     * Indicates whether the user's credentials (password) have expired.
     * @return Always returns true, indicating that the credentials never expire.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    /**
     * Indicates whether the user is enabled or disabled.
     * @return Always returns true, indicating that the user is always enabled.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
