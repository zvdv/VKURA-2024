import React from "react";
import { userAddress } from "./loginwallet";

let currentAddress = userAddress;
export {currentAddress};

export default function CurrentAccount(){
    return(
        <div>
            <p>Current address: {userAddress}</p>
        </div>
    )
}