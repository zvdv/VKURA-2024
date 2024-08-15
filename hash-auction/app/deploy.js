'use client'

import React from 'react';
import Web3 from 'web3';
//import web3 from './setweb3';
import { useSessionStorage } from 'usehooks-ts';
import { contractToDeploy } from './setweb3';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));
web3.eth.handleRevert = true;
web3.handleRevert = true;
// for some reason, web3.eth is undefined if I use the web3 that I import from setweb3, but it is defined when I make a new web3

export default function Deployer(props) {
    if (typeof web3 == "undefined"){
        return(<p>web3 is undefined 1</p>)
    }
    const { address, setContract } = props;

    async function deployContract(formData) {
        const fairFee = +formData.get('fairFee');
        const bidPeriod = +formData.get('bidPeriod');
        const revealPeriod = +formData.get('revealPeriod');
        const testing = formData.get('testing');
        const msgvalue = +formData.get('weivalue');

        console.log("Successfully declared variables!");

        const deployer = contractToDeploy.deploy({ arguments: [fairFee, bidPeriod, revealPeriod, testing] });

        console.log("Successfully created deployer!");

        //          1449000 estimate from Remix
        const gas = 2000000; // Could make this user-settable
        const gashex = "0x" + gas.toString(16);
        //const gasPrice = 20000000000;
        //const gasPricehex = "0x" + gasPrice.toString(16);
        const valuehex = "0x" + msgvalue.toString(16);

        console.log(address);
        let tx;

        // Sign transaction!
        const data = deployer.encodeABI();
        if (typeof web3 == "undefined"){
            console.log("web3 is undefined");
        } else if (typeof web3.eth == "undefined"){
            console.log("web3.eth is undefined");
        } else {
            console.log("Both are defined");
        }
        //return(<p>web3 is defined</p>)
        try {
            tx = "0xb117d834cc860898c606541a2db6616d0265e90f78fb1029810f1b2da9d84961";
            // tx = await window.ethereum.request({
            //     "method": "eth_sendTransaction",
            //     "params": [
            //         {
            //             // No "to" because contract creation
            //             "from": address,
            //             "gas": gashex,
            //             "value": valuehex,
            //             "data": data,
            //             // "gasPrice": gasPricehex
            //         }
            //     ]
            // });
            // document.getElementById('reply').innerHTML = "Successfully deployed at hash " + tx;
            const contractAddress = (await web3.eth.getTransactionReceipt(tx)).contractAddress;
            setContract(contractAddress);
        } catch (error) {
            console.error("Error deploying: " + error);
            document.getElementById('error').innerHTML = "Error:" + error;
        }
    }
    return (
        <div className='float-left my-4'>
            <form action={deployContract}>
                <label htmlFor='fairFee'>Minimum deposit for bidders and seller/deployer (wei): </label>
                <input type='number' id='fairFee' name='fairFee' min={0} required />
                <p>Please choose the number of blocks for each stage of the auction. Keep in mind 5 blocks on the Sepolia Testnet is about 1 minute.</p>
                <label htmlFor='bidPeriod'>Bidding period: </label>
                <input type='number' id='bidPeriod' name='bidPeriod' min={0} required />
                <br />
                <label htmlFor='revealPeriod'>Revealing period: </label>
                <input type='number' id='revealPeriod' name='revealPeriod' min={0} required />
                <br />
                <p>Are you testing? (Will ignore block periods if true.)</p>
                <input type='radio' id='true' name='testing' value={true} required />
                <label htmlFor='true'>Yes</label>
                <br />
                <input type='radio' id='false' name='testing' value={false} required />
                <label htmlFor='false'>No</label>
                <br />
                <label htmlFor='weivalue'>Value (wei) must be greater than or equal to the deposit: </label>
                <input type='number' id='weivalue' name='weivalue' required />
                <br />
                <input type='submit' value='Deploy' />
            </form>
            <p id='reply'></p>
            <p id='error'></p>
        </div>
    )
}