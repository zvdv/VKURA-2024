// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.26;

contract Auction {
    bool public open;

    struct Bidder {
        //bool exists;
        bool paidBack;
        bytes32 commit; // Hash of bid and random nonce
        uint bid; // Revealed bid
        uint nonce; // Revealed nonce
        bool validCommit; // Valid open of bid commitment
        uint paid; // How much money they have deposited in the contract (not necessarily equal to bid)
    }
    mapping(address=>Bidder) public bids;
    address[] public bidders;
    uint public auctioneerPaid; // How much money the auctioneer has deposited in the contract

    // Auction Parameters
    address public auctioneerAddress;
    //string public auctioneerPublicKey;
    uint public fairFee; // Minimum deposit for auctioneer and bidders to ensure fairness
    uint public bidPeriodEnd; // Number of blocks
    uint public revealPeriodEnd;
    uint public claimWinnerEnd;
    uint public withdrawEnd;
    //uint public maxBidders;
    //uint public maxBid;

    address public winner;
    uint public winningBid;

    constructor(uint _fairFee, uint bidPeriod, uint revealPeriod, uint claimWinnerPeriod, uint withdrawPeriod) payable {
        require(msg.value >= _fairFee, "Insufficient deposit.");
        auctioneerPaid = msg.value;
        auctioneerAddress = msg.sender;
        //auctioneerPublicKey = _auctioneerPublicKey;
        bidPeriodEnd = block.number + bidPeriod;
        revealPeriodEnd = bidPeriodEnd + revealPeriod;
        claimWinnerEnd = revealPeriodEnd + claimWinnerPeriod;
        withdrawEnd = claimWinnerEnd + withdrawPeriod;
        //maxBidders = _maxBidders;
    }

    function bid(bytes32 _commit) public payable {
        require(msg.value >= fairFee, "Insufficient deposit.");
        require(block.number < bidPeriodEnd, "Outside bidding period.");
        //require(bidders.length < maxBidders, "Too many bidders.");
        require(bids[msg.sender].commit.length == 0, "Bidder has already bid.");
        bids[msg.sender].commit = _commit;
        bids[msg.sender].paid = msg.value;
        bidders.push(msg.sender);
    }

    function reveal(uint _bid, uint _nonce) public {
        require(block.number < revealPeriodEnd && block.number > bidPeriodEnd, "Outside revealing period.");
        require(bids[msg.sender].commit.length != 0, "Bidder does not exist.");
        require(_bid <= bids[msg.sender].paid, "Bid is higher than bidder's deposit.");
        if (keccak256(abi.encode(_bid, _nonce)) == bids[msg.sender].commit){
            bids[msg.sender].validCommit = true;
            bids[msg.sender].bid = _bid;
            bids[msg.sender].nonce = _nonce;
        } else {
            bids[msg.sender].validCommit = false;
        }
    }

    function claimWinner() public OnlyAuctioneer {
        require(block.number > revealPeriodEnd && block.number < claimWinnerEnd, "Outside claim winner period.");
        for (uint i = 0; i < bidders.length; i++){
            if (bids[bidders[i]].bid > winningBid){
                winner = bidders[i];
                winningBid = bids[bidders[i]].bid;
            }
        }
        bids[winner].paid -= winningBid; // Value of winning bid stays in contract for now
    }

    function withdraw() public {
        require(block.number > claimWinnerEnd && block.number < withdrawEnd, "Outside withdrawal period.");
        uint amount = bids[msg.sender].paid;
        bids[msg.sender].paid = 0;
        payable(msg.sender).transfer(amount);
    }

    function endAuction() public OnlyAuctioneer {
        require(block.number > withdrawEnd, "Too early to close auction.");
        uint amount = auctioneerPaid;
        auctioneerPaid = 0;
        payable(auctioneerAddress).transfer(amount);
        open = true;
        // Clear all variables
    }

    // Make function mirroring constructor to start a new auction
    // Require open == true
    // Set 'open' bool back to false

    // Alternatively, add function on frontend to deploy a new copy of the auction contract (better I think)

    modifier OnlyAuctioneer(){
        require(msg.sender == auctioneerAddress, "Only auctioneer can call.");
        _;
    }
}