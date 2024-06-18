// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.26;

contract Auction {
    struct Bidder {
        bool exists;
        bool paidBack;
        uint commit;
        bytes reveal;
        bool validOpen;
        uint paid; // How much money they have deposited in the contract (not necessarily equal to bid)
    }
    mapping(address=>Bidder) public bids;
    address[] public bidders;
    uint public auctioneerPaid; // How much money the auctioneer has deposited in the contract
    enum State {Init, Challenge, Verify, ValidWin}
    State state;

    // Auction Parameters
    address public auctioneerAddress;
    string public auctioneerPublicKey;
    uint public fairFee; // Minimum deposit for auctioneer and bidders to ensure fairness
    uint public bidPeriodEnd; // Number of blocks
    uint public revealPeriodEnd; // Number of blocks
    uint public maxBidders;

    constructor(string memory _auctioneerPublicKey, uint _fairFee, uint bidPeriod, uint revealPeriod, uint _maxBidders) payable {
        require(msg.value >= _fairFee);
        auctioneerPaid = msg.value;
        auctioneerAddress = msg.sender;
        auctioneerPublicKey = _auctioneerPublicKey;
        bidPeriodEnd = block.number + bidPeriod;
        revealPeriodEnd = bidPeriodEnd + revealPeriod;
        maxBidders = _maxBidders;
    }

    function bid(uint _commit) public payable {
        require(msg.value >= fairFee);
        require(block.number < bidPeriodEnd);
        require(bidders.length < maxBidders);
        require(bids[msg.sender].exists == false); // Has not bid yet
        bids[msg.sender].exists = true;
        bids[msg.sender].commit = _commit;
        bidders.push(msg.sender);
    }

    function reveal(bytes memory _reveal) public {
        require(block.number < revealPeriodEnd && block.number > bidPeriodEnd);
        require(bids[msg.sender].exists == true);
        bids[msg.sender].reveal = _reveal; // Bidders encrypt their bid with the auctioneer's public key
    }
}