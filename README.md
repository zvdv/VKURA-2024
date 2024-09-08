# SecureBid: Sealed-bid Blockchain Auctions

This summer, I received a Valerie Kuehne Undergraduate Research Award (VKURA) to conduct a hands-on exploration of blockchain technology. I surveyed the infrastructure of blockchain, its current and potential applications, as well as its benefits and drawbacks. I implemented a smart contract for secure online auctions using hash functions, to preserve bidder honesty and to prevent auctioneer corruption.

I began my research by following an [online course on blockchain technology](https://www.pulpspy.com/courses/blockchain/index.html), as well as attending [ECE 406: Applied Cryptography](https://heat.csc.uvic.ca/coview/course/2024011/ECE406), a UVic course taught by my supervisor, Dr. Riham AlTawy. Both these courses developed my understanding of the concepts and techniques necessary to build and understand a blockchain application. I also began studying existing decentralised apps (DApps), specifically an [auction DApp](https://github.com/HSG88/AuctionContract) similar to what I aimed to build, with an accompanying article, "Verifiable Sealed-Bid Auction on the Ethereum Blockchain" by  H. S. Galal and A. M. Youssef. Whereas the auction DApp I studied used more advanced techniques including elliptic curve cryptography, I was able to implement the necessary cryptographic properties for my DApp using hash functions, one of the most fundamental cryptographic primitives.

## My DApp

My DApp is built upon the smart contract `Hash-Auction.sol`, where I implemented what I learned to create an auction structure that is secure, and takes advantage of blockchain technology. Through the React-based front-end, you can interact with the Sepolia test network, which behaves like the Ethereum blockchain, but without real currency, which is why it's great for testing and designing DApps.

There are several phases of the decentralised auction:

1. **Deploy:** Using the form on the SecureBid site, deploy a copy of the smart contract with your chosen parametres. The deploying address is assumed to be the person auctioning off a product, but they do not have any auctioneer responsibilities.
2. **Bid:** Creates a hash of your bid, which is sent to the smart contract as your commitment.
3. **Reveal:** After the bidding period, all bidders have a chance to reveal their bids. Because of the hash commitment, they cannot change their bids and must reveal their true bid in order to have a chance at winning and getting their fairness deposit back.
4. **Claim Winner:** After the revealing period, the smart contract determines the highest of the valid bids, and sets this bidder as the winner.
5. **Withdraw:** Once the winner has been claimed, all bidders can withdraw their deposited funds from the auction. The winner can withdraw anything more than their bid.
6. **End Auction:** The deployer withdraws their deposit, plus the winning bid as payment for whatever is being auctioned.

## Running the DApp

In order to interact with the blockchain, you will need Ethereum wallet addresses. It's relatively easy to make a few accounts with [MetaMask](https://metamask.io/). If you've set up your accounts correctly, the DApp should automatically request to connect to your accounts, and you will see your current address displayed on the site.

To run the DApp locally, open your terminal to the `hash-auction` folder and run

```bash
npm install
```

For a development version of the DApp (real time changes as you change code), run

```bash
npm run dev
```

For an optimised production version, run

```bash
npm run build
npm run start
```

It will display a localhost link where you can see it up and running and try things out! If you want proof that this is really interacting with a real-life blockchain, head to the [Sepolia Block Explorer](https://sepolia.etherscan.io/), and search up your deployed contract's address, or that of accounts you've bid with, and you'll be able to see the transactions appear as they're confirmed on the network.
