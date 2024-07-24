'use client';

import React from 'react';
import Web3 from 'web3';
import AuctionMetaData from '../../artifacts/Auction_metadata.json';
import Hasher from './encode';
import Deployer from './deploy';
import Account from './displayaccount';
import Bidders from './bidder';
import { userAddress } from './loginwallet';
import { useSessionStorage } from 'usehooks-ts';
import { useState } from 'react';

// const AuctionContractABI = AuctionMetaData.output.abi;
// const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

// const contractAddress = '0x90c5b9D0936fa081e05e7699EECa9585f5Ea3192';
// const contract = new web3.eth.Contract(AuctionContractABI, contractAddress);

export default function Home() {
  const [address, setAddress] = useSessionStorage('address', userAddress);
  const [contract, setContract] = useSessionStorage('contract');
  const [bidders, setBidders] = useState([]);

  return (
    <div className="p-24">
      <p className='text-xl font-bold text-fuchsia-300'>SecureBid:</p>
      <h1 className='text-3xl font-bold text-fuchsia-300'>BLOCKTIONEER</h1>
      <Account address={address} setAddress={setAddress}/>
      {/* <Contract contract={contract} setContract={setContract}/> */}
      <Hasher address={address} contract={contract} bidders={bidders} setBidders={setBidders}/>
      <Deployer address={address}/>
      <Bidders key={bidders} bidders={bidders} setBidders={setBidders} />
    </div>
  );
}

// <button onClick={contract.methods.bid(0xf33caff651ce9bbcdf2dc43ea34a6e9bed305342fa9625856053f0e5cfcccd3c).call()}>Bid 240 wei with 323 nonce</button>
