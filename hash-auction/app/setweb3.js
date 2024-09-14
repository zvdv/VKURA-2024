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
import Reveal from './reveal';
import ClaimWinner from './claimwinner';
import Withdraw from './withdraw';
import EndAuction from './endauction';
//import WinnerListen from './winnerlisten';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));
web3.eth.handleRevert = true;
web3.handleRevert = true;
export { web3 };

const contractToDeploy = new web3.eth.Contract(abi);
contractToDeploy.defaultChain = "sepolia";
contractToDeploy.options.data = "0x" + bytecode;
contractToDeploy.handleRevert = true;
export { contractToDeploy };

// const contractAddress = '0xa8d32ec71dc2bde11c3f9a58cc2be75a07462765'; //Most recent Sepolia deployed version
// const auctionContract = new web3.eth.Contract(abi, contractAddress);
// // const fairFee = auctionContract.methods.fairFee().call();
// export { auctionContract };

export default function Setup() {
    const [address, setAddress] = useState('0x0000000000000000000000000000000000000000');
    const [contract, setContract] = useState('0xB17E416DB98764Ebb5Fa35fF25E9396776dd732a'); // Set this back to default when done testing!
    const [bidders, setBidders] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const [contractInstance, setContractInstance] = useState();
    useEffect(() => {
        setIsClient(true);
    }, []);

    function bidder_has_bid(addr) {
        for (let i = 0; i < bidders.length; i++) {
            if (bidders[i].address == addr) {
                return true;
            }
        }
        return false;
    }

    function bidder_has_revealed(addr){
        for (let i = 0; i < bidders.length; i++) {
            if (bidders[i].address == addr) {
                if (bidders[i].revealed == true){
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    return (
        <div>
            {isClient ? <Account address={address} setAddress={setAddress} /> : <div className='my-4 p-2 w-fit border-2 border-turquoise-deep rounded-lg'><p>Loading account...</p></div>}
            <Contract contract={contract} setContract={setContract} />
            <Deployer address={address} contract={contract} setContract={setContract} setContractInstance={setContractInstance} />
            {contract != '0x0000000000000000000000000000000000000000' ?
                bidder_has_bid(address) ?
                    bidder_has_revealed(address) ?
                        <></>
                        // <WinnerListen contractInstance={contractInstance} />
                        // Either shows claim winner button or withdraw and end auciton buttons
                        :
                        <Reveal address={address} contract={contract} bidders={bidders} />
                    :
                    <Hasher address={address} contract={contract} bidders={bidders} setBidders={setBidders} />
                :
                <></>
            }
            {/* On claimed winner event show withdraw and end auction */}
            <ClaimWinner address={address} contract={contract} />
            <Withdraw address={address} contract={contract} />
            <EndAuction address={address} contract={contract} />
            <Bidders key={bidders} bidders={bidders} setBidders={setBidders} />
        </div>
    );
}

