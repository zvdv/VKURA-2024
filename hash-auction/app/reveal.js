'use client'

import React from 'react'
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

export default function Reveal(props){
    const address = props;
    function reveal(){

    }

    return(
        <div className='float-left my-4'>
            <form action={reveal}>
                <label htmlFor='bid'>Enter your bid (wei): </label>
                <input type='number' id='bid' name='bid' min={0} required />
                <br />
                <label htmlFor='nonce'>Enter the nonce used in your commitment: </label>
                <input type='number' id='nonce' name='nonce' required />
                <br />
                <input type='submit' value='Reveal' />
            </form>
        </div>
    )
}