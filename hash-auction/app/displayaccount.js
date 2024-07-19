'use client'

import React from "react";
import { userAddress } from "./loginwallet";
import { useSessionStorage } from 'usehooks-ts';

export function getAddress(){
    const [address, setAddress] = useSessionStorage('address', userAddress);
    return [address, setAddress];
}

export default function Account(){
    
    async function changeAccount(){
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        getAddress()[1](accounts[0]);
    }
    return(
        <div>
            <p>Current address: {getAddress()[0]}</p>
            <button onClick={changeAccount}>Change account</button>
        </div>
    )
}