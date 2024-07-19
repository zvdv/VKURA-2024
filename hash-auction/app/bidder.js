class Bidder {
    constructor(address, bid, nonce, hash){
        this.address = address;
        this.bid = bid;
        this.nonce = nonce;
        this.hash = hash;
    }
}

const bidders = [];

export {Bidder};
export {bidders};