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
    mapping(address=>uint) public bids;

    // Auction Parameters
    address public auctioneerAddress;
    string public auctioneerPublicKey;
    uint public auctioneerPaid; // How much money the auctioneer has deposited in the contract
    uint public fairFee; // Minimum deposit for auctioneer and bidders to ensure fairness
    uint public bidPeriodEnd; // Number of blocks
    uint public revealPeriodEnd; // Number of blocks

    constructor(string memory _auctioneerPublicKey, uint _fairFee, uint _bidPeriodEnd, uint _revealPeriodEnd) payable {
        require(msg.value >= _fairFee);
        auctioneerPaid = msg.value;
        auctioneerAddress = msg.sender;
        auctioneerPublicKey = _auctioneerPublicKey;
        bidPeriodEnd = block.number + _bidPeriodEnd;
        revealPeriodEnd = bidPeriodEnd + _revealPeriodEnd;
    }
}