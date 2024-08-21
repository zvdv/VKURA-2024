'use client'

import React from 'react'
import Web3 from 'web3'
import { contractToDeploy } from './setweb3';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

export default function Reveal(props){
    const { address, contract } = props;

    async function reveal(formData){
        const bid = +formData.get('bid');
        const nonce = +formData.get('nonce');

        const data = contractToDeploy.methods.reveal(bid, nonce).encodeABI(); //send({from: address, value: formData.get('value')});
        const gas = 200000;
        const gashex = "0x" + gas.toString(16);

        try {
            tx = await window.ethereum.request({
                "method": "eth_sendTransaction",
                "params": [
                    {
                        "to": contract,
                        "from": address,
                        "gas": gashex,
                        "data": data,
                    }
                ]
            });
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className='float-left my-4'>
            <form action={reveal}>
                <label htmlFor='bid'>Enter your bid (wei): </label>
                <input type='number' id='bid' name='bid' min={0} required />
                <br />
                <label htmlFor='nonce'>Enter the nonce used in your commitment: </label>
                <input type='number' id='nonce' name='nonce' required />
                <br />
                <input type='submit' value='Reveal' />
            </form>
        </div>
    )
}