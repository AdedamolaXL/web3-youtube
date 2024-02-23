// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PieLocked {
    receive() external payable {
        revert("Withdrawals not allowed");
    }
}
