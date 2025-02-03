// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow {
    address public partyA;
    address public partyB;
    address public partyC;
    IERC721 public nft;
    IERC20 public stablecoin;
    uint256 public nftId;
    uint256 public usdcAmount;
    bool public partyAConfirmed;
    bool public partyBConfirmed;

    constructor(address _partyA, address _partyB, address _partyC, address _nft, address _stablecoin) {
        partyA = _partyA;
        partyB = _partyB;
        partyC = _partyC;
        nft = IERC721(_nft);
        stablecoin = IERC20(_stablecoin);
    }

    function depositNFT(uint256 _nftId) external {
        //require(msg.sender == partyA, "Only Party A can deposit NFT");
        nft.transferFrom(msg.sender, address(this), _nftId);
        nftId = _nftId;
    }

    function depositUSDC(uint256 amount) external {
        //require(msg.sender == partyB, "Only Party B can deposit USDC");
        stablecoin.transferFrom(msg.sender, address(this), amount);
        usdcAmount = amount;
    }

    function confirmA() external {
        //require(msg.sender == partyA, "Only Party A can confirm");
        partyAConfirmed = true;
        finalizeTrade();
    }

    function confirmB() external {
        //require(msg.sender == partyB, "Only Party B can confirm");
        partyBConfirmed = true;
        finalizeTrade();
    }

    function finalizeTrade() internal {
        if (partyAConfirmed && partyBConfirmed) {
            nft.transferFrom(address(this), partyB, nftId);
            stablecoin.transfer(partyA, usdcAmount);
        }
    }
}
