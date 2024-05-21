// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "hardhat/console.sol";

contract auctionBids {
    struct Bid {
        address bidder;
        uint bid;
    }
    Bid[] bids;
    uint i;

    constructor() {
        i = 0;
    }

    function makeBid(address addr, uint value) public {
        bids[i] = Bid(addr, value);
        i++;
    }

    function printBids() public pure {
        // address bidder0 = bids[0].bidder;
        // uint bid0 = bids[0].bid;

        console.log(
            "Hello"
        );
    }

}
