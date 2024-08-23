import React from "react";

export default function ClaimWinner(props) {
    const { address } = props;

    async function claimWinner() {

    }

    return(
        <div className="float-right my-4">
            <button onClick={claimWinner}>Claim Winner</button>
        </div>
    )
}