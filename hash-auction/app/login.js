'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { isAddress } from 'web3-validator';

let userAddress = null;
export {userAddress};

export default function Login() {
  const router = useRouter();

  function validateAddress(){
      if (isAddress(document.getElementById('address').value)){
        userAddress = document.getElementById('address').value;
        router.push('/dashboard');
      } else {
        alert("Please enter a valid Ethereum address.");
      }
  }

  return (
    <div class='centerdiv'>
      <form action={validateAddress}>
          <label htmlFor='address'>Ethereum address: </label>
          <input type='text' id='address' name='address' />
          <br />
          <input type='submit' value='Login'/>
      </form>
    </div>
  );
}