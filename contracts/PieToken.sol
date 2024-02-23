// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9; 

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PieToken is ERC20 {
    address public lockedContractAddress;
    mapping(string => uint256) public videoHashes;

    constructor(string memory name, string memory symbol, address _lockedContractAddress) ERC20(name, symbol) {
        lockedContractAddress = _lockedContractAddress;
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function mintToLocked(string calldata videoHash, uint256 newTokenAmount) public {
        require(bytes(videoHash).length > 0, "Video hash cannot be empty");
        if (videoHashes[videoHash] != 0) {
            _mint(lockedContractAddress, newTokenAmount - videoHashes[videoHash]);
            videoHashes[videoHash] += newTokenAmount - videoHashes[videoHash];
        } else {
            _mint(lockedContractAddress, newTokenAmount);
            videoHashes[videoHash] = newTokenAmount;
        }
    }
}