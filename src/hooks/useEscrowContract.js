import { useContext, useState, useEffect } from "react";
import { Web3Context } from "../context/Web3Context";
import { ethers } from "ethers";
import EscrowABI from "../contracts/EscrowABI.json";

const CONTRACT_ADDRESS = "0x81Cc40E854da73416E32569F2Edb7320d8ed6B1d";

export const useEscrowContract = () => {
  const { signer } = useContext(Web3Context);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (signer) {
      const escrowContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        EscrowABI,
        signer
      );
      setContract(escrowContract);
    }
  }, [signer]);

  return contract;
};
