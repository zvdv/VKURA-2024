# Secure Blockchain Auctions
This summer, I received a Valerie Kuehne Undergraduate Research Award (VKURA) to conduct a hands-on exploration of blockchain technology. I surveyed the infrastructure of blockchain, its current and potential applications, as well as its benefits and drawbacks. I specifically implemented a smart contract for secure online auctions using hash functions to preserve bidder honesty, and removing the human auctioneer to prevent corruption. I began my research by following an [online course on blockchain technology](https://www.pulpspy.com/courses/blockchain/index.html), as well as attending [ECE 406: Applied Cryptography](https://heat.csc.uvic.ca/coview/course/2024011/ECE406), a UVic course taught by my VKURA supervisor, Dr. Riham AlTawy. Both these courses developed my fundamental understanding of the concepts and techniques necessary to build and understand a blockchain application.
I also began studying existing decentralised apps (DApps), specifically an [auction DApp](https://github.com/HSG88/AuctionContract) similar to what I was aiming to build, with an accompanying article, "Verifiable Sealed-Bid Auction on the Ethereum Blockchain" by  H. S. Galal and A. M. Youssef. Whereas the auction DApp I studied used more advanced techniques including elliptic curve cryptography, I was able to implement the necessary cryptographic properties for my DApp using hash functions, one of the most fundamental cryptographic primitives.

## My DApp
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
