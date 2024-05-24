// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "hardhat/console.sol";

contract auctionBids {
    address payable admin;
    address payable[] bidders;
    mapping(address => uint) bid;

    uint[] bids;
    uint i;

    constructor() {
        i = 0;
        // Set admin
        admin = payable(msg.sender);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function makeBid(address payable addr) public payable {
        bid[addr] = msg.value;
        bidders[i] = addr;
        i++;
    }

    function closeAuction() public onlyAdmin {
        uint maxBid = 0;
        uint maxIndex = 0;

        // Find highest bid
        for (uint j = 0; j < bidders.length; j++){
            if (bid[bidders[j]] > maxBid){
                maxBid = bid[bidders[j]];
                maxIndex = j;
            }
        }

        // Return bids that aren't the highest
        for (uint k = 0; k < bidders.length; k++){
            if (k != maxIndex){
                bidders[k].transfer(bid[bidders[k]]);
                // Will throw an exception if transfer doesn't go through
                // Could use send() instead and error-handle
            }
        }

        // Transfer highest bid to Admin (who would transfer whatever's being auctioned to the winner)
        admin.transfer(bid[bidders[maxIndex]]);
    }    

    function newAuction() public onlyAdmin {
        // Clear bidder and bid arrays
        delete bidders;
        i = 0;
    }

    function printBids() public view {
        console.log("First Bid:", bidders[0], " ", bid[bidders[0]]);
        console.log("Second Bid:", bidders[1], " ", bid[bidders[1]]);
        console.log("Third Bid:", bidders[2], " ", bid[bidders[2]]);
    }
}
