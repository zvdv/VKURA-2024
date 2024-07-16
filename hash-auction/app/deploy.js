import React from 'react';
import Web3 from 'web3';
import AuctionMetaData from '../../artifacts/Auction_metadata.json';
import AuctionByteCode from '../../artifacts/Auction_bytecode.txt';

const AuctionContractABI = AuctionMetaData.output.abi;
const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

const contract = new web3.eth.Contract(AuctionContractABI);
contract.defaultChain = "sepolia";
contract.options.data = AuctionByteCode;

function deployContract(fairFee, bidPeriod, revealPeriod, claimWinnerPeriod, withdrawPeriod, testing, auctioneerAddress){
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

}