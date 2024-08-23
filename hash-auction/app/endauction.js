import React from "react";
import { contractToDeploy } from "./setweb3";

export default function EndAuction(props) {
    const { address, contract } = props;

    async function endAuction() {
        const data = contractToDeploy.methods.endAuction().encodeABI();
        const gas = 200000;
        const gashex = "0x" + gas.toString(16);
        try {
            tx = await window.ethereum.request({
                "method": "eth_sendTransaction",
                "params": [
                    {
                        "to": contract,
                        "from": address,
                        "gas": gashex,
                        "data": data,
                    }
                ]
            });
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="float-right my-4">
            <button onClick={endAuction}>End Auction</button>
        </div>
    )
}