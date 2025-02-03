// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(address => bool) public minters;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    function setMinter(address minter, bool status) external onlyOwner {
        minters[minter] = status;
    }

    function mint(address to, string memory uri) public {
        _tokenIdCounter++;
        _mint(to, _tokenIdCounter);
        _setTokenURI(_tokenIdCounter, uri);
    }
}
