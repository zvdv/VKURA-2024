'use client';

import React from 'react';
import web3 from './setweb3';
import AuctionMetaData from '../../artifacts/Auction_metadata.json';
import AuctionByteCode from '../../artifacts/Auction_bytecode.json';
import { useSessionStorage } from 'usehooks-ts';

const AuctionContractABI = AuctionMetaData.output.abi;

const contract = new web3.eth.Contract(AuctionContractABI);
contract.defaultChain = "sepolia";
contract.options.data = "0x" + AuctionByteCode.bytecode;
contract.handleRevert = true;

let auctioneerAddress;

async function deployContract(auctioneerAddress){
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
    let msgvalue = document.getElementById('value').value;

    console.log("Successfully declared variables!");

    const deployer = contract.deploy({arguments: [fairFee, bidPeriod, revealPeriod, claimWinnerPeriod, withdrawPeriod, testing]});

    console.log("Successfully created deployer!")

    //const gas = await deployer.estimateGas({from: auctioneerAddress});
    const gas = 2000000;

    console.log("Successfully estimated gas!");

    try {
        console.log("In try.")
        const tx = await deployer.send({
            from: auctioneerAddress,
            gas: gas,
            gasPrice: 10000000000,
            value: msgvalue,
        });
        console.log("Sent deploy!")
        document.getElementById('reply').innerHTML = "Deployed at address: " + tx.options.address;
    } catch (error) {
        console.log(error);
        document.getElementById('error').innerHTML = "Log: " + error;
    }
    //return tx.options.contractAddress;
}

export default function Deployer({address}){

    return (
        <div className='float-left my-4'>
        <form action={() => deployContract(address)}>
            <label htmlFor='fairFee'>Minimum deposit for bidders and auctioneer (wei): </label>
            <input type='number' id='fairFee' name='fairFee' min={0} required />
            <p>Please choose the number of blocks for each stage of the auction. Keep in mind 5 blocks on the Sepolia Testnet is about 1 minute.</p>
            <label htmlFor='bidPeriod'>Bidding period: </label>
            <input type='number' id='bidPeriod' name='bidPeriod' min={0} required />
            <br />
            <label htmlFor='revealPeriod'>Revealing period: </label>
            <input type='number' id='revealPeriod' name='revealPeriod' min={0} required />
            <br />
            <label htmlFor='claimWinnerPeriod'>Claiming winner period: </label>
            <input type='number' id='claimWinnerPeriod' name='claimWinnerPeriod' min={0} required />
            <br />
            <label htmlFor='withdrawPeriod'>Withdrawing period:</label>
            <input type='number' id='withdrawPeriod' name='withdrawPeriod' min={0} required />
            <br />
            <p>Are you testing? (Will ignore block periods if true.)</p>
            <input type='radio' id='true' name='testing' value={true} required />
            <label htmlFor='true'>Yes</label>
            <br />
            <input type='radio' id='false' name='testing' value={false} required />
            <label htmlFor='false'>No</label>
            <br />
            <label htmlFor='value'>Value (wei): </label>
            <input type='number' id='value' name='value' required />
            <br />
            <input type='submit' />
        </form>
        <p id='reply'></p>
        <p id='error'></p>
        </div>
    )
}