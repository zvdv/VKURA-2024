# Secure Blockchain Auctions
This summer, I received a Valerie Kuehne Undergraduate Research Award (VKURA) to research blockchain, its uses, and more specifically, how to build a decentralised app (DApp). I worked with my supervisor, Dr. Riham AlTawy, to understand the 

## My DApp
I was initially aiming to implement a similar structure to [this auction](https://github.com/zvdv/Auction-Galal-Youssef), which accompanies the article, "Verifiable Sealed-Bid Auction on the Ethereum Blockchain" by  H. S. Galal and A. M. Youssef. In `EC-ZKP-Auction.sol` I started rewriting their code in a way I could understand and learn from. Their auction uses zero-knowledge proofs (ZKPs) and elliptic curve cryptography, which are both complex ways of making things secure and private. My DApp implements hash functions to create a more straightforward, but still secure, version of the app.

My DApp is built upon the smart contract `Hash-Auction.sol`, where I implemented what I learned to create an auction structure that is secure, and takes advantage of blockchain technology.


## Running the DApp
Open your terminal to the `hash-auction` folder. For a development version of the DApp (real time changes as you change code), run
```bash
npm run dev
```
For an optimised production version, run
```bash
npm run build
npm run start
```
