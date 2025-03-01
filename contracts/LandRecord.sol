// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRecord {
    struct Land {
        uint256 id;
        string location;
        uint256 area; // In square meters
        address owner;
        bool exists;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    event LandRegistered(uint256 indexed landId, string location, uint256 area, address indexed owner);
    event PropertyTransferred(uint256 indexed landId, address indexed newOwner);

    // Register a new land record
    function registerLand(string memory location, uint256 area) public {
        landCount++;
        lands[landCount] = Land(landCount, location, area, msg.sender, true);

        emit LandRegistered(landCount, location, area, msg.sender);
    }

    // Transfer ownership of a land
    function transferOwnership(uint256 landId, address newOwner) public {
        require(lands[landId].exists, "Land does not exist");
        require(lands[landId].owner == msg.sender, "Only the owner can transfer ownership");

        lands[landId].owner = newOwner;

        emit PropertyTransferred(landId, newOwner);
    }

    // Verify ownership
    function verifyOwnership(uint256 landId) public view returns (address) {
        require(lands[landId].exists, "Land does not exist");
        return lands[landId].owner;
    }
}
