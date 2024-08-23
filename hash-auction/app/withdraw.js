import React from "react";

export default function Withdraw(props) {
    const { address } = props;

    async function withdraw() {

    }

    return(
        <div className="float-right my-4">
            <button onClick={withdraw}>Withdraw Funds</button>
        </div>
    )
}