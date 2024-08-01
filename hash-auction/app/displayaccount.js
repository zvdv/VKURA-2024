import React, { useState, useEffect } from "react";
import changeAccount from "./changeaccount";
import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example JavaScript Dapp",
    url: window.location.href,
  },
  //infuraAPIKey: process.env.INFURA_API_KEY,
  // Other options.
})

// You can also access via window.ethereum.
const ethereum = MMSDK.getProvider()

const getAccounts = ethereum.request({ method: "eth_requestAccounts", params: [] });

export default function Account(props) {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { address, setAddress } = props;

    function change() {
        setAddress(changeAccount(getAccounts));
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
