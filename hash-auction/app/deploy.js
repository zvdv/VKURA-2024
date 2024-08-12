'use client'

import React from 'react';
import web3 from './setweb3';
import { useSessionStorage } from 'usehooks-ts';
import { contractToDeploy } from './setweb3';

export default function Deployer({address}){
    async function deployContract(formData){
        const fairFee = +formData.get('fairFee');
        const bidPeriod = +formData.get('bidPeriod');
        const revealPeriod = +formData.get('revealPeriod');
        const withdrawPeriod = +formData.get('withdrawPeriod');
        const testing = formData.get('testing');
        // let testing;
        // let radio = document.getElementsByName('testing');
        // if (radio[0].checked){
        //     testing = radio[0].value;
        // } else {
        //     testing = radio[1].value;
        // }
        const msgvalue = +formData.get('weivalue');
    
        console.log("Successfully declared variables!");
    
        const deployer = contractToDeploy.deploy({arguments: [fairFee, bidPeriod, revealPeriod, withdrawPeriod, testing]});
    
        console.log("Successfully created deployer!")
    
        // const gas = await deployer.estimateGas(function(err, gas){
        //     console.log(gas);
        // });
        // // // // 1449000 estimate from Remix
        const gas = 2000000; // Could make this user-settable
        const gashex = "0x"+gas.toString(16);
        const gasPrice = 2000000000;
        const gasPricehex = "0x"+gasPrice.toString(16);
        const valuehex = "0x"+msgvalue.toString(16);
    
        console.log(address);
        let tx;
    
        // Sign transaction!
        const data = deployer.encodeABI();
    
        try {
            console.log("In try");
            // console.log("Testing: " + testing + " type " + typeof testing);
            // console.log("Fair fee: " + fairFee + " type " + typeof fairFee);
            // console.log("Bid period: " + bidPeriod + " type " + typeof bidPeriod);
            // console.log("Reveal period: " + revealPeriod + " type " + typeof revealPeriod);
            // console.log("Withdraw period: " + withdrawPeriod + " type " + typeof withdrawPeriod);
            // console.log("Gas: " + gas + " type " + typeof gas);
            // console.log("from: " + address);
            console.log("gas hex: " + gashex);
            //console.log("Value: " + msgvalue + " type " + typeof msgvalue);
            console.log("value hex: " + valuehex);
            //console.log("data: " + data);
            console.log("gasPrice hex: " + gasPricehex);
            
            tx = await window.ethereum.request({
                "method": "eth_sendTransaction",
                "params": [
                  {
                    // No "to" because contract creation
                    "from": address,
                    "gas": gashex,
                    "value": valuehex,
                    "data": data,
                    "gasPrice": gasPricehex
                  }
                ]
            });
            document.getElementById('reply').innerHTML = "Successfully deployed at hash " + tx;
        } catch(error) {
            console.error("Error deploying: " + error);
            document.getElementById('error').innerHTML = "Error:" + error;
        }
    
        // try {
        //     console.log("In try");
        //     tx = await deployer.send({
        //         from: address,
        //         gas: gas,
        //         gasPrice: 10000000000,
        //         value: msgvalue,
        //     });
        //     console.log("Sent deploy!")
        //     document.getElementById('reply').innerHTML = "Deployed at address: " + tx.options.address;
        // } catch (error) {
        //     console.log(error);
        //     document.getElementById('error').innerHTML = "Log: " + error;
        // }
        
        //return tx.options.contractAddress;
    }
    return (
        <div className='float-left my-4'>
        <form action={deployContract}>
            <label htmlFor='fairFee'>Minimum deposit for bidders and seller/deployer (wei): </label>
            <input type='number' id='fairFee' name='fairFee' min={0} required />
            <p>Please choose the number of blocks for each stage of the auction. Keep in mind 5 blocks on the Sepolia Testnet is about 1 minute.</p>
            <label htmlFor='bidPeriod'>Bidding period: </label>
            <input type='number' id='bidPeriod' name='bidPeriod' min={0} required />
            <br />
            <label htmlFor='revealPeriod'>Revealing period: </label>
            <input type='number' id='revealPeriod' name='revealPeriod' min={0} required />
            <br />
            {/* <label htmlFor='claimWinnerPeriod'>Claiming winner period: </label>
            <input type='number' id='claimWinnerPeriod' name='claimWinnerPeriod' min={0} required />
            <br /> */}
            <label htmlFor='withdrawPeriod'>Withdrawing period:</label>
            <input type='number' id='withdrawPeriod' name='withdrawPeriod' min={0} required />
            <br />
            <p>Are you testing? (Will ignore block periods if true.)</p>
            <input type='radio' id='true' name='testing' value={true} required />
            <label htmlFor='true'>Yes</label>
            <br />
            <input type='radio' id='false' name='testing' value={false} required />
            <label htmlFor='false'>No</label>
            <br />
            <label htmlFor='weivalue'>Value (wei): </label>
            <input type='number' id='weivalue' name='weivalue' required />
            <br />
            <input type='submit' />
        </form>
        <p id='reply'></p>
        <p id='error'></p>
        </div>
    )
}