import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import EscrowABI from "../abis/Escrow.json";
import NFTABI from "../abis/MyNFT.json";
import USDCABI from "../abis/USDC.json";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [escrowContract, setEscrowContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [usdcContract, setUsdcContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        
        setProvider(provider);
        setSigner(signer);

        const escrowAddress = "0xe6eD3E9Fe66186b54730B13FE24749b678412cc5"; 
        const nftAddress = "0x79aAfCf637C7EC037481E30D2f2b40E00dA3d4Ad"; 
        const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

        const escrowContract = new ethers.Contract(escrowAddress, EscrowABI, signer);
        const nftContract = new ethers.Contract(nftAddress, NFTABI, signer);
        const usdcContract = new ethers.Contract(usdcAddress, USDCABI, signer);

        setEscrowContract(escrowContract);
        setNftContract(nftContract);
        setUsdcContract(usdcContract);
      } catch (error) {
        console.error("Web3Modal connection error:", error);
      }
    };

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ provider, signer, escrowContract, nftContract, usdcContract }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;