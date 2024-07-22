'use client';

import React, { useEffect } from "react";

export default function Account(props){

    useEffect(() => {
        console.log(props);
    });

    const {address, setAddress} = props;

    async function changeAccount(){
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        setAddress(accounts[0]);
    }

    return(
        <div>
            <p>Current address: {address}</p>
            <button onClick={changeAccount}>Change account</button>
        </div>
    )
}