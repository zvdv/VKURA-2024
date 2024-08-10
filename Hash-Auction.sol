// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.25;

contract Auction {
    bool public testing;
    bool public tie;

    struct Bidder {
        //bool exists;
        //bool paidBack;
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
    //uint public claimWinnerEnd;
    uint public withdrawEnd;
    uint public withdrawPeriod;
    //uint public maxBidders;
    //uint public maxBid;

    address public winner;
    uint public winningBid;
    bool public winnerClaimed = false;
    event winnerSet(address indexed _winner);

    constructor(uint _fairFee, uint bidPeriod, uint revealPeriod, /*uint claimWinnerPeriod,*/ uint _withdrawPeriod, bool _testing) payable {
        require(msg.value >= _fairFee, "Insufficient deposit.");
        fairFee = _fairFee;
        auctioneerPaid = msg.value;
        auctioneerAddress = msg.sender;
        //auctioneerPublicKey = _auctioneerPublicKey;
        bidPeriodEnd = block.number + bidPeriod;
        revealPeriodEnd = bidPeriodEnd + revealPeriod;
        //claimWinnerEnd = revealPeriodEnd + claimWinnerPeriod;
        //withdrawEnd = claimWinnerEnd + withdrawPeriod;
        withdrawPeriod = _withdrawPeriod;
        //maxBidders = _maxBidders;
        testing = _testing;
    }

    function bid(bytes32 _commit) public payable {
        require(msg.value >= fairFee, "Insufficient deposit.");
        require(block.number < bidPeriodEnd || testing, "Outside bidding period.");
        require(msg.sender != auctioneerAddress, "Auctioneer cannot bid.");
        //require(bidders.length < maxBidders, "Too many bidders.");
        require(bids[msg.sender].commit == "", "Bidder has already bid.");
        bids[msg.sender].commit = _commit;
        bids[msg.sender].paid = msg.value;
        bidders.push(msg.sender);
    }

    function reveal(uint _bid, uint _nonce) public {
        require(block.number < revealPeriodEnd && block.number > bidPeriodEnd || testing, "Outside revealing period.");
        require(bids[msg.sender].commit != "", "Bidder does not exist.");
        require(_bid <= bids[msg.sender].paid, "Bid is higher than bidder's deposit.");
        if (keccak256(abi.encode(_bid, _nonce)) == bids[msg.sender].commit){
            bids[msg.sender].validCommit = true;
            bids[msg.sender].bid = _bid;
            bids[msg.sender].nonce = _nonce;
        } else {
            bids[msg.sender].validCommit = false;
            revert("Invalid open of commitment.");
        }
    }

    function claimWinner() public {
        require(winnerClaimed == false, "Winner has already been claimed.");
        require(block.number > revealPeriodEnd /*&& block.number < claimWinnerEnd*/|| testing, "Outside claim winner period.");
        for (uint i = 0; i < bidders.length; i++){
            if (bids[bidders[i]].validCommit == false){
                continue;
            }
            if (bids[bidders[i]].bid > winningBid){
                winner = bidders[i];
                winningBid = bids[bidders[i]].bid;
            } else if (bids[bidders[i]].bid == winningBid) {
                tie = true;
                // Keep first bidder, pass over tie (do nothing)
            }
        }
        bids[winner].paid -= winningBid; // Value of winning bid stays in contract for now
        winnerClaimed = true;
        withdrawEnd = block.number + withdrawPeriod;
        emit winnerSet(winner);
    }

    function withdraw() public {
        require(winnerClaimed && block.number < withdrawEnd || testing, "Outside withdrawal period.");
        require(bids[msg.sender].validCommit == true, "Bidder forfeits deposit by not revealing.");
        uint amount = bids[msg.sender].paid;
        bids[msg.sender].paid = 0;
        payable(msg.sender).transfer(amount);
    }

    function endAuction() public {
        require(block.number > withdrawEnd || testing, "Too early to close auction.");
        uint amount = auctioneerPaid;
        auctioneerPaid = 0;
        payable(auctioneerAddress).transfer(amount);
    }
}