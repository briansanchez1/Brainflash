package com.g5.brainflash.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/secure")
@RequiredArgsConstructor
public class DemoController {
    
    @GetMapping
    public ResponseEntity<String> secure() {
        return ResponseEntity.ok("Secured Endpoint");
    }
}
