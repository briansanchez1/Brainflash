package com.g5.brainflash.common.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents an error response returned by the API.
 */
@Data
@AllArgsConstructor
public class ErrorResponse {
    private String message; // Error message
}