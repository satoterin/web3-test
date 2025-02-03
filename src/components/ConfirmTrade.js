import { useContext } from "react";
import Web3Context from "../context/Web3Context";

const ConfirmTrade = ({ party }) => {
  const { escrowContract, signer } = useContext(Web3Context);

  const confirm = async () => {
    try {
      const tx = await escrowContract.connect(signer)[party === "A" ? "confirmA" : "confirmB"]();
      await tx.wait();
      alert("Confirmed!");
    } catch (error) {
      console.error(error);
      alert("Confirmation Failed");
    }
  };

  return <button onClick={confirm}>Confirm as Party {party}</button>;
};

export default ConfirmTrade;
