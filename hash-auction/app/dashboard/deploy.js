'use client'

import React from 'react';
import web3 from '../setweb3';
import AuctionMetaData from '../../../artifacts/Auction_metadata.json';
import AuctionByteCode from '../../../artifacts/Auction_bytecode.json';
import { userAddress } from '../loginwallet';

const AuctionContractABI = AuctionMetaData.output.abi;

const contract = new web3.eth.Contract(AuctionContractABI);
contract.defaultChain = "sepolia";
contract.options.data = "0x" + AuctionByteCode.bytecode;

let auctioneerAddress;

async function deployContract(){
    let fairFee = document.getElementById('fairFee').value;
    let bidPeriod = document.getElementById('bidPeriod').value;
    let revealPeriod = document.getElementById('revealPeriod').value;
    let claimWinnerPeriod = document.getElementById('claimWinnerPeriod').value;
    let withdrawPeriod = document.getElementById('withdrawPeriod').value;
    let testing;
    let radio = document.getElementsByName('testing');
    if (radio[0].checked){
        testing = radio[0].value;
    } else {
        testing = radio[1].value;
    }
    //document.getElementById('radio').innerHTML = testing;
    auctioneerAddress = userAddress;

    const deployer = contract.deploy({arguments: [fairFee, bidPeriod, revealPeriod, claimWinnerPeriod, withdrawPeriod, testing]});

    const gas = await deployer.estimateGas({from: auctioneerAddress});

    try {
        const tx = await deployer.send({
            from: auctioneerAddress,
            gas: gas,
            gasPrice: 10000000000
        });
        document.getElementById('reply').innerHTML = "Deployed at address: " + tx.options.address;
    } catch (error) {
        console.log(error);
    }
    //return tx.options.contractAddress;
}

export default function Deployer(){
    return (
        <div className='outline outline-green-300'>
        <form action={deployContract}>
            <label for='fairFee'>Minimum deposit for bidders (and auctioneer): </label>
            <input type='number' id='fairFee' name='fairFee' />
            <p>Please choose the number of blocks for each stage of the auction. Keep in mind 5 blocks on the Sepolia Testnet is about 1 minute.</p>
            <label for='bidPeriod'>Bidding period: </label>
            <input type='number' id='bidPeriod' name='bidPeriod' />
            <br />
            <label for='revealPeriod'>Revealing period: </label>
            <input type='number' id='revealPeriod' name='revealPeriod' />
            <br />
            <label for='claimWinnerPeriod'>Claiming winner period: </label>
            <input type='number' id='claimWinnerPeriod' name='claimWinnerPeriod' />
            <br />
            <label for='withdrawPeriod'>Withdrawing period:</label>
            <input type='number' id='withdrawPeriod' name='withdrawPeriod' />
            <br />
            <p>Are you testing? (Will ignore block periods if true.)</p>
            <input type='radio' id='true' name='testing' value={true} />
            <label for='true'>Yes</label>
            <br />
            <input type='radio' id='false' name='testing' value={false} />
            <label for='false'>No</label>
            <br />
            <input type='submit' />
        </form>
        <p id='reply'></p>
        </div>
    )
}