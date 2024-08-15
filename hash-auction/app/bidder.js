'use client'

import { useState, useEffect } from "react";

class Bidder {
    constructor(address, bid, nonce, hash) {
        this.address = address;
        this.bid = bid;
        this.nonce = nonce;
        this.hash = hash;
    }
}

//const bidders = [];

export { Bidder };
//export {bidders};

export default function Bidders(props) {
    const { bidders, setBidders } = props;

    let output = [];
    for (let i = 0; i < bidders.length; i++) {
        output = [...output, <div className="border-2 border-turquoise-deep rounded-lg p-2 m-2 float-right"><p className="font-bold">Bidder {i}:</p><p>Address: {bidders[i].address}</p><p>Bid: {bidders[i].bid}</p><p>Nonce: {bidders[i].nonce}</p><p>Hash: {bidders[i].hash}</p></div>];
    }

    return (
        <div>
            {output}
        </div>
    )
}