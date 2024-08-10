'use client';

import React, { useState, useEffect } from "react";
import { web3 } from "./setweb3";
//import changeAccount from "./changeaccount";
//import { MetaMaskSDK } from "@metamask/sdk"

// const MMSDK = new MetaMaskSDK({
//   dappMetadata: {
//     name: "Example JavaScript Dapp",
//     url: window.location.href,
//   },
//   //infuraAPIKey: process.env.INFURA_API_KEY,
//   // Other options.
// })

// // You can also access via window.ethereum.
// const ethereum = MMSDK.getProvider()

// const getAccounts = ethereum.request({ method: "eth_requestAccounts", params: [] });

export default function Account(props) {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { address, setAddress } = props;

    async function changeAccount() {
        let accounts = [];
        try {
            accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.error('Error getting accounts: ', error);
        } finally {
            //return accounts[0];
            console.log("Setting account...");
            setAddress(accounts[0]);
            web3.eth.defaultAccount = accounts[0];
            // let wallet = web3.eth.accounts.wallet.add(String(accounts[0]));
            // console.log(wallet);
            console.log("Finally");
        }
    } // Using async/await in client component... will bring back the errors later? But didn't fetch accounts without await

    function change() {
        if (typeof window.ethereum !== "undefined") {
            changeAccount();
            // const account = changeAccount();
            // // account seems to be address when used in setAddress, but console logs 'object promise'
            // setAddress(account);
            // console.log("Type of account returned: " + typeof account);
            // console.log("What's inside? " + Object.keys(account));
            // console.log("Account returned: " + account);
            // let wallet = web3.eth.accounts.wallet.add(String(account));
            // console.log(wallet);
        } else {
            document.getElementById('reply').innerHTML = "Please install Metamask wallet";
        }
    }

    // Log the type and value of address
    useEffect(() => {
        console.log("Type of address:", typeof address);
        console.log("Value of address:", address);
    }, [address]);

    return (
        <div className="my-4">
            {
                isClient ?
                    <div>
                        <p>Current address: {address}</p>
                        <button id='account' onClick={change}>Set Account</button>
                        <p id='reply'></p>
                    </div>
                    : <p>Loading...</p>
            }
        </div>
    )
}
