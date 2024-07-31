import Web3 from 'web3';
import abi from '../../artifacts/auction_abi.json';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));
web3.eth.handleRevert = true;
web3.handleRevert = true;

export default web3;

const contractAddress = '0xa8d32ec71dc2bde11c3f9a58cc2be75a07462765'; //Most recent Sepolia deployed version
const auctionContract = new web3.eth.Contract(abi, contractAddress);

// const fairFee = auctionContract.methods.fairFee().call();

export {auctionContract};

// would use server but then can't export object?