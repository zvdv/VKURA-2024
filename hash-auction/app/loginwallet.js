'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

let userAddress = null;
export {userAddress};

export default function Login() {
  const router = useRouter();

  async function connectWallet(){
    if (typeof window.ethereum !== "undefined") {
      // Metamask is installed
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
      document.getElementById("connect").innerHTML = "Connected!";
      userAddress = accounts[0]; // add change account button later
    } else {
      document.getElementById("reply").innerHTML = "Please install Metamask wallet";
      return
    }
    router.push('/dashboard');

  }

  return (
    <div class='centerdiv'>
      <button id='connect' onClick={connectWallet}>Connect Ethereum wallet</button>
      <p id='reply'></p>
    </div>
  );
}