'use client'

import React, {useEffect} from 'react';
import Web3 from 'web3';
import { useSessionStorage } from 'usehooks-ts';
import { contractToDeploy } from './setweb3';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));
web3.eth.handleRevert = true;
web3.handleRevert = true;

export default function Deployer(props) {
    const { address, contract, setContract } = props;

    async function deployContract(formData) {
        const fairFee = +formData.get('fairFee');
        const bidPeriod = +formData.get('bidPeriod');
        const revealPeriod = +formData.get('revealPeriod');
        const testing = formData.get('testing');
        const msgvalue = +formData.get('weivalue');

        console.log("Successfully declared variables!");

        const deployer = contractToDeploy.deploy({ arguments: [fairFee, bidPeriod, revealPeriod, testing] });

        console.log("Successfully created deployer!");

        const gas = 2000000; //1449000 estimate from Remix
        const gashex = "0x" + gas.toString(16);
        const valuehex = "0x" + msgvalue.toString(16);

        console.log(address);
        let tx;

        const data = deployer.encodeABI();
        
        try {
            //tx = "0xb117d834cc860898c606541a2db6616d0265e90f78fb1029810f1b2da9d84961";
            tx = await window.ethereum.request({
                "method": "eth_sendTransaction",
                "params": [
                    {
                        // No "to" because contract creation
                        "from": address,
                        "gas": gashex,
                        "value": valuehex,
                        "data": data,
                        // "gasPrice": gasPricehex
                    }
                ]
            });
            document.getElementById('reply').innerHTML = "Successfully deployed at hash " + tx;
            const contractAddress = (await web3.eth.getTransactionReceipt(tx)).contractAddress;
            setContract(contractAddress);
        } catch (error) {
            console.error("Error deploying: " + error);
            document.getElementById('error').innerHTML = "Error:" + error;
        }
    }

    if (contract != "0x0000000000000000000000000000000000000000"){
        return(<></>);
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