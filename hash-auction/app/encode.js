'use client'

import React from 'react'
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

// let encoded = web3.eth.abi.encodeParameters(['uint', 'uint'], ['240','323']);
// console.log(encoded);

// let hashed = web3.utils.soliditySha3(encoded);
// console.log(hashed);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function hash(bid){
    let nonce = getRndInteger(1000,1000000000);
    let encoded = web3.eth.abi.encodeParameters(['uint', 'uint'], [bid,nonce]);
    let hashed = web3.utils.soliditySha3(encoded);
    return hashed;
}

function output(){
    document.getElementById('reply').innerHTML = "";

    if (document.getElementById('bid').value < 0){
        document.getElementById('reply').innerHTML = "Please enter a positive integer.";
        return;
    }
    document.getElementById("hash").innerHTML = hash(document.getElementById("bid").value)
}

export default function Hasher() {
    return (
        <div className='outline outline-white'>
        <form action={output}>
            <label for='bid'>Enter bid:</label>
            <input type='number' id='bid' name='bid' />
            <input type='submit' />
        </form>
        <p id='reply'></p>
        <p id="hash">Hashed value: </p>
        </div>
    )
}

// <button onClick={result = hash(document.getElementById("bid").value)}>Hash bid with nonce</button>