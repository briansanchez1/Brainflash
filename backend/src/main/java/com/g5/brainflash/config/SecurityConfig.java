package com.g5.brainflash.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

/**
 * Configuration class for defining security settings in the application.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authProvider;

    /**
     * Configures security filters for HTTP requests.
     *
     * @param http HttpSecurity object to configure security settings.
     * @return A SecurityFilterChain object representing the configured security filter chain.
     * @throws Exception If an error occurs during configuration.
     */    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
            .csrf(AbstractHttpConfigurer::disable) // Disables CSRF (Cross-Site Request Forgery) protection.
            .cors(Customizer.withDefaults()) // Configures CORS (Cross-Origin Resource Sharing) using default settings.
            // Authorizes requests, permitting all requests to for registration and authentication and requiring authentication for any other request.
            .authorizeHttpRequests(req ->
                req.requestMatchers("/api/v1/auth/register","/api/v1/auth/authenticate")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
            )
            // Configures session management to be stateless.
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Sets the authentication provider.
            .authenticationProvider(authProvider)
            // Adds the JWT authentication filter before the UsernamePasswordAuthenticationFilter.
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        

        return http.build();
    }

    /**
     * Configures CORS settings.
     *
     * @return CorsConfigurationSource object representing the configured CORS settings.
     */    
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Sets allowed origins.
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); 
        // Sets allowed methods.
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); 
        // Sets allowed headers.
        configuration.setAllowedHeaders(Arrays.asList("*"));  
        // Allows credentials.
        configuration.setAllowCredentials(true);
        // Sets max age.
        configuration.setMaxAge(3600L);        
        // Registers the configured CORS configuration for all paths.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }       
}
