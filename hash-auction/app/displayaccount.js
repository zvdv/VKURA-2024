'use client';

import React, { useState, useEffect } from "react";
import { web3 } from "./setweb3";

export default function Account(props) {
    if (typeof window.ethereum == "undefined") {
        return(
            <div className="my-4 p-2 w-fit border-2 border-turquoise-deep rounded-lg">
                <p>Please connect to MetaMask wallet.</p>
            </div>
        )
    }

    changeAccount();

    window.ethereum.on("accountsChanged", changeAccount);

    const { address, setAddress } = props;

    async function changeAccount() {
        let accounts = [];
        try {
            accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Setting account...");
            setAddress(accounts[0]);
            web3.eth.defaultAccount = accounts[0];
        } catch (error) {
            console.error('Error getting accounts: ', error);
        }
    }

    // Log the type and value of address
    useEffect(() => {
        console.log("Type of address:", typeof address);
        console.log("Value of address:", address);
    }, [address]);

    return (
        <div className="my-4 p-2 w-fit border-2 border-turquoise-deep rounded-lg">
            <p>Current address: {address}</p>
        </div>
    )
}
