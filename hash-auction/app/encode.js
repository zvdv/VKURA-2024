'use client'

import React from 'react'
import Web3 from 'web3'
import { Bidder, bidders } from './bidder';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

// let encoded = web3.eth.abi.encodeParameters(['uint', 'uint'], ['240','323']);
// console.log(encoded);

// let hashed = web3.utils.soliditySha3(encoded);
// console.log(hashed);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// function hash(bid){
//     let nonce = getRndInteger(1000,1000000000);
//     let encoded = web3.eth.abi.encodeParameters(['uint', 'uint'], [bid,nonce]);
//     let hashed = web3.utils.soliditySha3(encoded);

//     bidders.push(new Bidder(, bid, nonce, hashed));
//     // Call contract to commit to hash

//     return hashed;
// }

// function output(){
//     //document.getElementById('reply').innerHTML = "";

//     // if (document.getElementById('bid').value < 0){
//     //     console.log("Please enter a positive integer.");
//     //     document.getElementById('reply').innerHTML = "Please enter a positive integer.";
//     //     return;
//     // }
//     document.getElementById("hash").innerHTML = hash(document.getElementById("bid").value);
// }

export default function Hasher(props) {
    const {address, contract, bidders, setBidders} = props;

    function hash(bid){
        let nonce = getRndInteger(1000,1000000000);
        let encoded = web3.eth.abi.encodeParameters(['uint', 'uint'], [bid,nonce]);
        let hashed = web3.utils.soliditySha3(encoded);
    
        setBidders([...bidders, new Bidder(address, bid, nonce, hashed)]);
        // Call contract to commit to hash
        //contract.methods.bid(hashed).send({from: address, value: 10});

        return {
            haash: hashed, 
            noonce: nonce
        }
    }

    function output(){
        const {haash, noonce} = hash(document.getElementById("bid").value);
        document.getElementById("hash").innerHTML = "Hash: " + haash + " Nonce: " + noonce;
    }

    return (
        <div className='float-left my-4'>
        <form action={output}>
            <label htmlFor='bid'>Enter bid:</label>
            <input type='number' id='bid' name='bid' min={0} required />
            <br />
            <p>Please choose a message value (in SepoliaETH) that is greater than or equal to both your bid and the fairness deposit. You may be prevented from withdrawing your funds if your deposit is less than your bid.</p>
            <label htmlFor='value'>Value:</label>
            <input type='number' id='value' name='value' min={0/*fairFee*/} required />
            <input type='hidden' id='address' name='address' value={address} pattern='0x[A-Za-z0-9]{40}' required /> {/* doesn't stop bid being submitted with empty address */}
            <input type='submit' value='Bid'/>
        </form>
        <p id='reply'></p>
        <p id="hash">Hashed value: </p>
        </div>
    )
}

// <button onClick={result = hash(document.getElementById("bid").value)}>Hash bid with nonce</button>