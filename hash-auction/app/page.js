'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { isAddress } from 'web3-validator';

export default function Login() {
    const router = useRouter();

    function validateAddress(){
        if (isAddress(document.getElementById('address').value)){
            router.push('/dashboard')
        } else {
            alert("Please enter a valid Ethereum address.")
        }
    }

    return (
      <main className=''>
        <form action={validateAddress}>
            <label for='address'>Ethereum address: </label>
            <input type='text' id='address' name='address' />
            <br />
            <input type='submit' value='Login' className='cursor-pointer'/>
        </form>
      </main>
    );
  }