// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.18;

import "@rmrk-team/evm-contracts/contracts/implementations/RMRKNestableImpl.sol";

contract Sport is RMRKNestableImpl {

    constructor(
        string memory name,
        string memory symbol,
        uint256 maxSupply,
        uint256 pricePerMint,
        string memory collectionMetadata,
        string memory tokenURI,
        address royaltyRecipient,
        uint256 royaltyPercentageBps
    ) RMRKNestableImpl(
    name,
    symbol,
    maxSupply,
    pricePerMint,
    collectionMetadata,
    tokenURI,
    royaltyRecipient,
    royaltyPercentageBps
    ) {}
}
