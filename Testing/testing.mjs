import Web3 from 'web3';
import abi from '../artifacts/auction_abi.json' with {type: 'json'};

const address = '0x98138Dc06475109F49B77060178fA1C4492e57F5';

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));
web3.eth.handleRevert = true;
web3.handleRevert = true;

const contractAddress = '0xa8d32ec71dc2bde11c3f9a58cc2be75a07462765'; //Most recent Sepolia deployed version
const auctionContract = new web3.eth.Contract(abi, contractAddress);

let fairFee = null;

// try{
//     fairFee = auctionContract.methods.fairFee().call();
// } catch(error) {
//     console.log(error);
// } finally {
//     console.log("Fair fee: " + fairFee);
// }

try {
    fairFee = await auctionContract.methods.auctioneerPaid().call({from: address});
} catch (error) {
    console.error('Error calling fairFee:', error);
} finally {
    console.log("Fair fee:", fairFee);
}