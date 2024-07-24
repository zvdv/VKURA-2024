import React, { useEffect } from "react";

export default function Account(props){

    // useEffect(() => {
    //     console.log(props);
    // });

    const {address, setAddress} = props;

    async function changeAccount(){
        if (typeof window.ethereum !== "undefined") {
            let accounts;
            try{
                accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            } catch(error) {
                console.error('Error getting accounts:', error);
            } finally {
                setAddress(accounts[0]);
            }
            //document.getElementById("account").innerHTML = "Connected!";
        } else {
            document.getElementById("reply").innerHTML = "Please install Metamask wallet";
        }
    }

    return(
        <div className="my-4">
            <p>Current address: {address}</p>
            <button id='account' onClick={changeAccount}>Set Account</button>
            <p id='reply'></p>
        </div>
    )
}