// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "hardhat/console.sol";

contract auctionBids {
    address payable admin;
    address payable[] bidders;
    uint[] bids;
    uint i;

    constructor() {
        i = 0;
        admin = payable(msg.sender);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function makeBid(address payable addr) public payable {
        bidders[i] = addr;
        bids[i] = msg.value;
        i++;
    }

    function closeAuction() public onlyAdmin {
        uint maxBid = 0;
        uint maxIndex = 0;

        // Find highest bid
        for (uint j = 0; j < bids.length; j++){
            if (bids[j] > maxBid){
                maxBid = bids[j];
                maxIndex = j;
            }
        }

        // Return bids that aren't the highest
        for (uint k = 0; k < bids.length; k++){
            if (k != maxIndex){
                bidders[k].transfer(bids[k]);
            }
        }

        // Transfer highest bid to Admin (who would transfer whatever's being auctioned to the winner)
        admin.transfer(bids[maxIndex]);
    }    

    function newAuction() public onlyAdmin {
        // Clear bidder and bid arrays
        delete bidders;
        delete bids;
        i = 0;
    }

    function printBids() public view {
        // Print first couple bids
        console.log("First Bid:", bidders[0], " ", bids[0]);
        console.log("Second Bid:", bidders[1], " ", bids[1]);
        console.log("Third Bid:", bidders[2], " ", bids[2]);
    }
}
