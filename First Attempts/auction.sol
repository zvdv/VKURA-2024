// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.2 <0.9.0;

// Following the tutorial at https://programtheblockchain.com/posts/2018/03/27/writing-a-sealed-bid-auction-contract/ 

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// is type IERC20 equivalent to IERC20Token?

contract EnglishAuction {
    address seller;

    IERC20 public token;
    uint256 public reservePrice;
    uint256 public endOfBidding;
    uint256 public endOfRevealing;

    constructor(IERC20 _token, uint256 _reservePrice, uint256 biddingPeriod, uint256 revealingPeriod) {
        token = _token;
        reservePrice = _reservePrice;

        endOfBidding = block.timestamp + biddingPeriod;
        endOfRevealing = endOfBidding + revealingPeriod;

        seller = msg.sender;
    }

    mapping(address => uint256) public balanceOf;
    mapping(address => bytes32) public hashedBidOf;

    function bid(bytes32 hash) public payable {
        // Allows new bids to overide previous bids

        require(block.timestamp < endOfBidding, "Outside bidding interval.");

        hashedBidOf[msg.sender] = hash;
        balanceOf[msg.sender] += msg.value;
        require(balanceOf[msg.sender] >= reservePrice, "Deposit below minimum bid.");
    }

    address public highBidder = msg.sender;
    uint256 public highBid;

    function reveal(uint256 amount, uint256 nonce) public {
        require(block.timestamp >= endOfBidding && block.timestamp < endOfRevealing, "Outside revealing interval.");
        require(keccak256(abi.encode(amount, nonce)) == hashedBidOf[msg.sender], "Invalid open of commitment.");
        require(amount >= reservePrice, "Bid is too low.");
        require(amount <= balanceOf[msg.sender], "Insufficient funds.");

        if (amount > highBid) {
            // return escrowed bid to previous high bidder
            balanceOf[seller] -= highBid;
            balanceOf[highBidder] += highBid;

            highBid = amount;
            highBidder = msg.sender;

            // transfer new high bid from high bidder to seller
            balanceOf[highBidder] -= highBid;
            balanceOf[seller] += highBid;
        }
    }

    function withdraw() public {
        require(block.timestamp >= endOfRevealing, "Outside of withdrawing interval.");

        uint256 amount = balanceOf[msg.sender];
        balanceOf[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function claim() public {
        require(block.timestamp >= endOfRevealing, "Outside of claiming interval.");

        uint256 t = token.balanceOf(address(this));
        // is address(this) what it should be?
        token.transfer(highBidder, t);
    }

    // Doesn't deal with failure to reveal bid
}
