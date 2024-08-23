import React from "react";

export default function EndAuction(props) {
    const { address } = props;

    async function endAuction() {

    }

    return(
        <div className="float-right my-4">
            <button onClick={endAuction}>End Auction</button>
        </div>
    )
}