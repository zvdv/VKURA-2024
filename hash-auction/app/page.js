import React from 'react';
import Web3 from 'web3';
import AuctionMetaData from '../../artifacts/Auction_metadata.json';
import Hasher from './encode.mjs';

const AuctionContractABI = AuctionMetaData.output.abi;
const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

const contractAddress = '0x90c5b9D0936fa081e05e7699EECa9585f5Ea3192';
const contract = new web3.eth.Contract(AuctionContractABI, contractAddress);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hasher />
    </main>
  );
}

// not finished at all :)
// <button onClick={contract.methods.bid(0xf33caff651ce9bbcdf2dc43ea34a6e9bed305342fa9625856053f0e5cfcccd3c).call()}>Bid 240 wei with 323 nonce</button>
