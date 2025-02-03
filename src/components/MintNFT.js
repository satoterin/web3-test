import React, { useState } from 'react';
import { ethers } from 'ethers';
import nftAbi from "../abis/MyNFT.json";

// Replace with your NFT contract's address and ABI
const nftAddress = "0x79aAfCf637C7EC037481E30D2f2b40E00dA3d4Ad"; // Replace with actual NFT contract address


const MintNFT = () => {
  const [partyAAddress, setPartyAAddress] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mintNFT = async () => {
    try {
      // Check if inputs are valid
      if (!partyAAddress || !tokenURI) {
        setError('Both Party A address and Token URI are required');
        return;
      }

      setIsLoading(true);
      setError('');

      // Request MetaMask to connect
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request MetaMask account access
      const signer = provider.getSigner();

      // Instantiate the contract with ABI and address
      const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);

      // Call the mint function
      const tx = await nftContract.mint(partyAAddress, tokenURI);
      console.log('Minting NFT...');
      await tx.wait(); // Wait for transaction confirmation

      alert("NFT Minted Successfully!");
      console.log('NFT Minted Successfully!');
    } catch (err) {
      console.error("Error minting NFT:", err);
      setError("Failed to mint NFT. See console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Mint NFT</h1>
      <div>
        <input
          type="text"
          placeholder="Party A Address"
          value={partyAAddress}
          onChange={(e) => setPartyAAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Token URI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
        />
      </div>
      <div>
        <button onClick={mintNFT} disabled={isLoading}>
          {isLoading ? 'Minting...' : 'Mint NFT'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MintNFT;
