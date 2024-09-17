'use client'

import React from 'react'
import Web3 from 'web3'
import { Bidder, bidders } from './bidder';
import { contractToDeploy } from './setweb3';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Hasher(props) {
    const { address, contract, bidders, setBidders } = props;

    async function hash(formData) {
        const bid = +formData.get('bid');
        const nonce = getRndInteger(1000, 1000000000);
        const encoded = web3.eth.abi.encodeParameters(['uint', 'uint'], [bid, nonce]);
        const hashed = web3.utils.soliditySha3(encoded);

        // Call contract to commit to hash
        const data = contractToDeploy.methods.bid(hashed).encodeABI(); //send({from: address, value: formData.get('value')});
        const gas = 200000;
        const gashex = "0x" + gas.toString(16);
        const value = +formData.get('value');
        const valuehex = "0x" + value.toString(16);

        try {
            tx = await window.ethereum.request({
                "method": "eth_sendTransaction",
                "params": [
                    {
                        "to": contract,
                        "from": address,
                        "gas": gashex,
                        "value": valuehex,
                        "data": data,
                    }
                ]
            });
        } catch (error) {
            console.error(error);
        }
        setBidders([...bidders, new Bidder(address, bid, nonce, hashed)]);
    }

    return (
        <div className='float-left my-4'>
            <form action={hash}>
                <label htmlFor='bid'>Enter bid (wei): </label>
                <input type='number' id='bid' name='bid' min={0} required />
                <br />
                <p>Please choose a message value (in SepoliaETH) that is greater than or equal to both your bid and the fairness deposit.</p>
                <p>You may be prevented from withdrawing your funds if your deposit is less than your bid.</p>
                <label htmlFor='value'>Value (wei): </label>
                <input type='number' id='value' name='value' min={0} required />
                <br />
                {/* something to prevent getting submitted with an empty address */}
                <input type='submit' value='Bid' />
            </form>
        </div>
    )
}