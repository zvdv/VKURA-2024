// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.26;

contract Auction {
    struct Bidder {
        //bool exists;
        bool paidBack;
        bytes commit;
        bytes reveal;
        bytes difference;
        bool validCommit; // Valid open of bid commitment
        bool validDifference; // Valid open of difference commitment
        uint paid; // How much money they have deposited in the contract (not necessarily equal to bid)
    }
    mapping(address=>Bidder) public bids;
    address[] public bidders;
    uint public auctioneerPaid; // How much money the auctioneer has deposited in the contract
    enum State {Init, Challenge, Verify, ValidWin, AllBiddersWithdraw}
    State state;

    bytes public G = hex"2bd3e6d0f3b142924f5ca7b49ce5b9d54c4703d7ae5648e61d02268b1a0a9fb721611ce0a6af85915e2f1d70300909ce2e49dfad4a4619c8390cae66cefdb204";
    bytes public H = hex"070a8d6a982153cae4be29d434e8faef8a47b274a053f5a4ee2a6c9c13c31e5c031b8ce914eba3a9ffb989f9cdd5b0f01943074bf4f0f315690ec3cec6981afc";
    bytes public P = hex"30644E72E131A029B85045B68181585D97816A916871CA8D3C208C16D87CFD47";
    uint public pp = convertBytesToUint(P);

    // Auction Parameters
    address public auctioneerAddress;
    string public auctioneerPublicKey;
    uint public fairFee; // Minimum deposit for auctioneer and bidders to ensure fairness
    uint public bidPeriodEnd; // Number of blocks
    uint public revealPeriodEnd; // Number of blocks
    uint public winnerPayEnd; // Number of blocks
    uint public maxBidders;
    uint public maxBid;

    // Set when auctioneer chooses winner
    address public winner;
    uint public winningBid;

    bool internal enterLock; // To guard against reentrancy attacks

    constructor(string memory _auctioneerPublicKey, uint _fairFee, uint bidPeriod, uint revealPeriod, uint winnerPayPeriod, uint _maxBidders) payable {
        require(msg.value >= _fairFee, "Insufficient deposit.");
        auctioneerPaid = msg.value;
        auctioneerAddress = msg.sender;
        auctioneerPublicKey = _auctioneerPublicKey;
        bidPeriodEnd = block.number + bidPeriod;
        revealPeriodEnd = bidPeriodEnd + revealPeriod;
        winnerPayEnd = revealPeriodEnd + winnerPayPeriod;
        maxBidders = _maxBidders;
    }

    function bid(bytes memory _commit) public payable {
        require(msg.value >= fairFee, "Insufficient deposit.");
        require(block.number < bidPeriodEnd, "Outside bidding period.");
        require(bidders.length < maxBidders, "Too many bidders.");
        require(bids[msg.sender].commit.length == 0, "Bidder has already bid.");
        //bids[msg.sender].exists = true;
        bids[msg.sender].commit = _commit;
        bids[msg.sender].paid = msg.value;
        bidders.push(msg.sender);
    }

    function reveal(bytes memory _reveal) public {
        require(block.number < revealPeriodEnd && block.number > bidPeriodEnd, "Outside revealing period.");
        require(bids[msg.sender].commit.length != 0, "Bidder does not exist.");
        bids[msg.sender].reveal = _reveal; // Bidders encrypt their bid with the auctioneer's public key
    }

    modifier challengeByAuctioneer() {
        require(msg.sender == auctioneerAddress, "Must be called by auctioneer.");
        require(block.number > revealPeriodEnd && block.number < winnerPayEnd, "Outside verification time.");
        _;
    }

    function beginVerify(address _winner, uint _winBid, uint _winRand) public challengeByAuctioneer {
        require(state == State.Init, "Invalid state.");
        require(bids[_winner].commit.length != 0, "Bidder does not exist.");
        require(_winBid < maxBid, "Invalid bid.");
        require(pedersenVerify(_winBid, _winRand, bids[_winner].commit), "Invalid open of commitment.");
        winner = _winner;
        winningBid = _winBid;
        state = State.Challenge;
    }

    // End auction in the case of a dishonest auctioneer (called by contract if it checks something that proves this)
    function dishonestAuctioneer() private {
        state = State.AllBiddersWithdraw;
    }

    function withdraw(address bidder) public {
        require(enterLock == false, "Reentrancy attempt.");
        if (state != State.AllBiddersWithdraw){
            require(bidder != winner, "Winner cannot withdraw.");
        }
        enterLock = true;
        payable(bidder).transfer(bids[bidder].paid);
        bids[bidder].paid = 0;
        enterLock = false;
    }

    // Pedersen commitments
     function pedersenCommit(uint x, uint r) public returns (bytes memory) {
        return ecAdd(ecMul(G, x), ecMul(H, r));
    }
    function pedersenVerify(uint x, uint r, bytes memory c) public returns (bool) {
        return isEqual(c, pedersenCommit(x, r));       
    }

    // Difference commitments
    function createCommitsDifferences() private {
        for (uint i = 0; i < bidders.length; i++) {
            if (bidders[i] != winner) {
                bids[bidders[i]].difference = commitDifference(bids[winner].commit, bids[bidders[i]].commit);
            }
        }
    }
    function commitDifference(bytes memory x, bytes memory y) private returns (bytes memory) {
        return ecAdd(x, ecNeg(y));
    }

    // Elliptic curve operations
    function ecMul(bytes memory x, uint y) private returns (bytes memory) {
        bool success = false;
        bytes memory input = new bytes(96);
        bytes memory output = new bytes(64);
        assembly {
            mstore(add(input, 32), mload(add(x, 32)))
            mstore(add(input, 64), mload(add(x, 64)))
            mstore(add(input, 96), y)
            success := call(gas(), 7, 0, add(input, 32), 96, add(output, 32), 64)
        }
        require(success);
        return output;
    }
    function ecAdd(bytes memory x, bytes memory y) private returns (bytes memory) {
        bool success = false;
        bytes memory input = new bytes(128);
        bytes memory output = new bytes(64);
        assembly {
            mstore(add(input, 32), mload(add(x, 32)))
            mstore(add(input, 64), mload(add(x, 64)))
            mstore(add(input, 96), mload(add(y, 32)))
            mstore(add(input, 128), mload(add(y, 64)))
            success := call(gas(), 6, 0, add(input, 32), 128, add(output, 32), 64)
        }
        require(success);
        return output;
    }
    function ecNeg(bytes memory input) private view returns (bytes memory) {
        bytes memory output = new bytes(64);
        bytes memory y = new bytes(32);
        assembly{
            mstore(add(y, 32), mload(add(input,64)))
        }
        uint yy = convertBytesToUint(y);
        uint rr = pp - yy;
        assembly{
            mstore(add(output, 32), mload(add(input, 32)))
            mstore(add(output, 64), rr)
        }
        return output;
    }

    function isEqual(bytes memory x, bytes memory y) private pure returns (bool) {
        require(x.length == y.length);
        for (uint i = 0; i<x.length; i++) {
            if (x[i] != y[i]) {
                return false;
            }
        }
        return true;
    }
    function convertBytesToUint(bytes memory x) private pure returns (uint) {
        uint r;
        assembly{
            r :=mload(add(x,32))
        }
        return r;
    }
}
