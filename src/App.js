import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';

const App = () => {
  const [tokenAAddress, setTokenAAddress] = useState('0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'); 
  const [tokenBAddress, setTokenBAddress] = useState('0x2170ed0880ac9a755fd29b2688956bd959f933f8'); 
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const contractAddress = '0x7fDD9D9699A1Dd6a8Db5bd027803887aA166028b'; // Replace with the deployed contract address
  const web3 = new Web3(window.ethereum);

  const handleSwap = async () => {
    try {
      const contract = new web3.eth.Contract(ABI, contractAddress);
      const selectedToken = (tokenAAddress === '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d') ? tokenBAddress : tokenAAddress;
      await contract.methods.swapTokens(selectedToken, amount).send({ from: web3.eth.defaultAccount });
      setMessage('Swap successful!');
    } catch (error) {
      console.error(error);
      setMessage('Swap failed. Check the console for error details.');
    }
  };

  const fetchBalances = async () => {
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const tokenABalance = await contract.methods.getTokenABalance().call();
    const tokenBBalance = await contract.methods.getTokenBBalance().call();
    console.log('Token A Balance:', tokenABalance);
    console.log('Token B Balance:', tokenBBalance);
  };

  return (
    <div className="App">
      <h1>Decentralized Exchange</h1>
      <div>
        <label>
          Token A Address:
          <input type="text" value={tokenAAddress} onChange={(e) => setTokenAAddress(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Token B Address:
          <input type="text" value={tokenBAddress} onChange={(e) => setTokenBAddress(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
      </div>
      <button onClick={handleSwap}>Swap Tokens</button>
      <p>{message}</p>
      <button onClick={fetchBalances}>Fetch Balances</button>
    </div>
  );
};

export default App;
