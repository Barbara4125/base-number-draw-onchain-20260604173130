// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title NumberDrawVault
/// @notice Minimal public number draw contract designed for low-cost Base deployment.
contract NumberDrawVault {
    uint16 public constant POOL_START = 1;
    uint16 public constant POOL_SIZE = 120;

    uint256 public drawCount;
    mapping(address => bool) public hasDrawn;

    event DrawExecuted(address indexed participant, uint256 indexed id, uint16 number, bytes32 proofHash);

    error AlreadyDrawn();

    function runDraw() external returns (uint256 id, uint16 number, bytes32 proofHash) {
        if (hasDrawn[msg.sender]) revert AlreadyDrawn();

        id = ++drawCount;
        hasDrawn[msg.sender] = true;

        proofHash = keccak256(
            abi.encodePacked(block.chainid, address(this), msg.sender, id, block.prevrandao, blockhash(block.number - 1))
        );
        number = uint16((uint256(proofHash) % POOL_SIZE) + POOL_START);

        emit DrawExecuted(msg.sender, id, number, proofHash);
    }
}
