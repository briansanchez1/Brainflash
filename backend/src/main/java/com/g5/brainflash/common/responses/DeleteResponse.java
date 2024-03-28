package com.g5.brainflash.common.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a successful entity delete response returned by API.
 */
@Data
@AllArgsConstructor
public class DeleteResponse {
    private String message; // Success message
}
