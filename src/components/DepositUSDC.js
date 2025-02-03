import { useContext, useState } from "react";
import Web3Context from "../context/Web3Context";
import { ethers } from 'ethers';

const DepositUSDC = () => {
  const { escrowContract, usdcContract, signer } = useContext(Web3Context);
  const [amount, setAmount] = useState("");

  const depositUSDC = async () => {
    try {
      const txApprove = await usdcContract.approve(escrowContract.address, ethers.utils.parseUnits(amount, 6));
      await txApprove.wait();

      const txDeposit = await escrowContract.connect(signer).depositUSDC(ethers.utils.parseUnits(amount, 6));
      await txDeposit.wait();

      alert("USDC Deposited!");
      console.log('USDC Deposited Successfully!');
      
    } catch (error) {
      console.error(error);
      alert("Deposit Failed");
    }
  };

  return (
    <div>
      <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={depositUSDC}>Deposit USDC</button>
    </div>
  );
};

export default DepositUSDC;
