package com.g5.brainflash.common.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a successful entity update response returned by API.
 */
@Data
@AllArgsConstructor
public class UpdateResponse {
    private String message; // Success message
}
