import { useContext, useState } from "react";
import Web3Context from "../context/Web3Context";

const DepositNFT = () => {
  const { escrowContract, nftContract, signer } = useContext(Web3Context);
  const [nftId, setNftId] = useState("");

  const depositNFT = async () => {
    try {
      const txApprove = await nftContract.connect(signer).approve(escrowContract.address, nftId);
      await txApprove.wait();

      const txDeposit = await escrowContract.connect(signer).depositNFT(nftId);
      await txDeposit.wait();

      alert("NFT Deposited!");
      console.log('NFT Deposited Successfully!');
    } catch (error) {
      console.error(error);
      alert("Deposit Failed");
    }
  };

  return (
    <div>
      <input type="text" placeholder="NFT ID" value={nftId} onChange={(e) => setNftId(e.target.value)} />
      <button onClick={depositNFT}>Deposit NFT</button>
    </div>
  );
};

export default DepositNFT;
