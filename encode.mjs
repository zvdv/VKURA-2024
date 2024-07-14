import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('https://rpc.sepolia.org'));

let encoded = web3.eth.abi.encodeParameters(['uint', 'uint'], ['100','97']);
console.log(encoded);

let hashed = web3.utils.soliditySha3(encoded);
console.log(hashed);