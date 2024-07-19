'use client'

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

export default function Bidders(){
    function getBidders(){
        document.getElementById('bidders').innerHTML = bidders[0].nonce;
    }
    return(
        <div>
            <button onClick={getBidders}>Bidders</button>
            <p id='bidders'></p>
        </div>
    )
}