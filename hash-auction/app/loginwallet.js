'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

let userAddress;
export {userAddress};

export default function Login() {
  const router = useRouter();

  async function connectWallet(){
    if (typeof window.ethereum !== "undefined") {
      // Metamask is installed
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
      userAddress = accounts[0]; // add change account button later
      document.getElementById("connect").innerHTML = "Connected!";
    } else {
      document.getElementById("reply").innerHTML = "Please install Metamask wallet";
      return;
    }
    router.push('/dashboard');
  }

  return (
    <div>
      <button id='connect' onClick={connectWallet}>Connect Ethereum wallet</button>
      <p id='reply'></p>
    </div>
  );
}