import MintNFT from "./components/MintNFT";
import DepositNFT from "./components/DepositNFT";
import DepositUSDC from "./components/DepositUSDC";
import ConfirmTrade from "./components/ConfirmTrade";
import { Web3Provider } from "./context/Web3Context";

function App() {
  return (
    <Web3Provider>
      <div>
        <h1>NFT Escrow DApp</h1>
        <MintNFT />
        <DepositNFT />
        <DepositUSDC />
        <ConfirmTrade party="A" />
        <ConfirmTrade party="B" />
      </div>
    </Web3Provider>
  );
}

export default App;
