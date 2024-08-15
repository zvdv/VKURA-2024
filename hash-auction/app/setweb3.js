'use client';

// For setting up things that work on client

import Web3 from 'web3';
import React, { useState, useEffect } from 'react';
import Hasher from './encode';
import Deployer from './deploy';
import Account from './displayaccount';
import Bidders from './bidder';
import Contract from './contract';
import abi from '../../artifacts/auction_abi.json';
import bytecode from '../../artifacts/auction_bytecode.json';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));
web3.eth.handleRevert = true;
web3.handleRevert = true;
export { web3 };

const contractToDeploy = new web3.eth.Contract(abi);
contractToDeploy.defaultChain = "sepolia";
contractToDeploy.options.data = "0x" + bytecode;
contractToDeploy.handleRevert = true;
export {contractToDeploy};

const contractAddress = '0xa8d32ec71dc2bde11c3f9a58cc2be75a07462765'; //Most recent Sepolia deployed version
const auctionContract = new web3.eth.Contract(abi, contractAddress);
// const fairFee = auctionContract.methods.fairFee().call();
export { auctionContract };

export default function Setup() {
    const [address, setAddress] = useState('0x0000000000000000000000000000000000000000');
    const [contract, setContract] = useState('0x0000000000000000000000000000000000000000');
    const [bidders, setBidders] = useState([]);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div>
            {isClient ? <Account address={address} setAddress={setAddress} /> : <div className='my-4 p-2 w-fit border-2 border-turquoise-deep rounded-lg'><p>Loading account...</p></div>}
            <Contract contract={contract} setContract={setContract} />
            <Deployer address={address} setContract={setContract} />
            {/* {contract == '0x0000000000000000000000000000000000000000' ?
            <></> :
            <Hasher address={address} contract={contract} bidders={bidders} setBidders={setBidders} />
            } */}
            <Hasher address={address} contract={contract} bidders={bidders} setBidders={setBidders} />
            <Bidders key={bidders} bidders={bidders} setBidders={setBidders} />
        </div>
    );
}

