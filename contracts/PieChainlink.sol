// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import {PieToken} from "./PieToken.sol"; // Import PieToken contract

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract PieChainlink is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    PieToken public pieToken; // Declare PieToken contract variable

    error UnexpectedRequestID(bytes32 requestId);

    event Response(bytes32 indexed requestId, bytes response, bytes err);

    constructor(
        address router,
        address _pieToken // Pass address of PieToken contract
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        pieToken = PieToken(_pieToken); // Initialize PieToken contract instance
    }

    // Existing functions...

    /**
     * @notice Store latest result/error and mint tokens
     * @param requestId The request ID, returned by sendRequest()
     * @param response Aggregated response from the user code
     * @param err Aggregated error from the user code or from the execution pipeline
     * Either response or error parameter will be set, but never both
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        s_lastResponse = response;
        s_lastError = err;
        emit Response(requestId, s_lastResponse, s_lastError);

        // Parse response to get amount and address to mint tokens
        (address to, uint256 amount) = abi.decode(response, (address, uint256));
        
        // Mint tokens using PieToken contract
        pieToken.mint(to, amount);
    }
}
