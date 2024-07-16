import React from 'react';
import Web3 from 'web3';
import AuctionMetaData from '../../artifacts/Auction_metadata.json';
import AuctionByteCode from '../../artifacts/Auction_bytecode.txt';

const AuctionContractABI = AuctionMetaData.output.abi;
const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

const contract = new web3.eth.Contract(AuctionContractABI);
contract.defaultChain = "sepolia";
contract.options.data = AuctionByteCode;

function deployContract(){
    fairFee = document.getElementById("fairFee").value

    contract.deploy({arguments: [fairFee, bidPeriod, revealPeriod, claimWinnerPeriod, withdrawPeriod, testing]})
    .send({
        from: auctioneerAddress
    })
    .on('error', function(error){
        console.log(error);
    })
    .on('transactionHash', function(transactionHash){
        console.log(transactionHash);
    })
    .on('receipt', function(receipt){
    console.log(receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log(receipt);
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
    return receipt.contractAddress;
}

export default function Deployer(){
    return (
        <div className='outline outline-green'>
        <form action={deployContract()}>
            <label for='fairFee'>Minimum deposit for bidders (and auctioneer):</label>
            <input type='number' id='fairFee' name='fairFee' className='rounded text-black' />
            <p>Please choose the number of blocks for each stage of the auction. Keep in mind 5 blocks on the Sepolia Testnet is about 1 minute.</p>
            <label for='bidPeriod'>Bidding period:</label>
            <input type='number' id='bidPeriod' name='bidPeriod' className='rounded text-black' />
            <label for='revealPeriod'>Revealing period:</label>
            <input type='number' id='revealPeriod' name='revealPeriod' className='rounded text-black' />
            <label for='claimWinnerPeriod'>Claiming winner period:</label>
            <input type='number' id='claimWinnerPeriod' name='claimWinnerPeriod' className='rounded text-black' />
            <label for='withdrawPeriod'>Withdrawing period:</label>
            <input type='number' id='withdrawPeriod' name='withdrawPeriod' className='rounded text-black' />
            <p>Are you testing? (Will ignore block periods if true.)</p>
            <input type='radio' id='true' name='testing' value={true} />
            <label for='true'>Yes</label>
            <input type='radio' id='false' name='testing' value={false} />
            <label for='false'>No</label>
            <input type='submit' />
        </form>
        </div>
    )
}