import React from "react";
import { contractToDeploy } from "./setweb3";

export default function ClaimWinner(props) {
    const { address, contract } = props;

    async function claimWinner() {
        const data = contractToDeploy.methods.claimWinner().encodeABI();
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
            <button onClick={claimWinner}>Claim Winner</button>
        </div>
    )
}