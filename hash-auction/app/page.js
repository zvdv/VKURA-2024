'use client';

import React from 'react';
// import Web3 from 'web3';
// import abi from '../../artifacts/auction_abi.json';
import web3, {auctionContract} from './setweb3';
import Hasher from './encode';
import Deployer from './deploy';
import Account from './displayaccount';
import Bidders from './bidder';
import { userAddress } from './loginwallet';
import { useSessionStorage } from 'usehooks-ts';
import { useState } from 'react';
import Contract from './contract';

//const AuctionContractABI = abi;
// const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

// const contractAddress = '0xa8d32ec71dc2bde11c3f9a58cc2be75a07462765'; //Most recent Sepolia deployed version
// const auctionContract = new web3.eth.Contract(abi, contractAddress);

export default function Home() {
  const [address, setAddress] = useSessionStorage('address', userAddress);
  const [contract, setContract] = useSessionStorage('contract', auctionContract);
  const [bidders, setBidders] = useState([]);

  //let prov = Web3.providers.WebsocketProvider;
  // if(Web3.givenProvider != null){
  //   prov = "Given provider: " + Web3.givenProvider;
  // } else {
  //   prov = "No given provider.";
  // }

  return (
    <div className="p-24">
      <p className='text-xl font-bold text-fuchsia-300'>SecureBid:</p>
      <h1 className='text-3xl font-bold text-fuchsia-300'>BLOCKTIONEER</h1>
      {/* <Account address={address} setAddress={setAddress}/> */}
      {/* <Contract contract={contract} setContract={setContract}/> */}
      <Hasher address={address} contract={contract} bidders={bidders} setBidders={setBidders}/>
      <Deployer address={address}/>
      {/* <p>Fair Fee: {fairFee}</p>
      <p>Testing? {testing}</p> */}
      <Bidders key={bidders} bidders={bidders} setBidders={setBidders} />
      {/* <p>contractAddress: {contractAddress}</p>
      <p>auctionContract.options.address: {auctionContract.options.address}</p> 
      The addresses do match.*/}
    </div>
  );
}

// <button onClick={contract.methods.bid(0xf33caff651ce9bbcdf2dc43ea34a6e9bed305342fa9625856053f0e5cfcccd3c).call()}>Bid 240 wei with 323 nonce</button>
