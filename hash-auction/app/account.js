// 'use client'

// import React from "react";
// import { userAddress } from "./loginwallet";
// import { useSessionStorage } from 'usehooks-ts';

// export default function getAddress(){
//     const [address, setAddress] = useSessionStorage('address', userAddress);
    
// }

// export default function Account(){
//     const [address, setAddress] = useSessionStorage('address', userAddress);

//     async function changeAccount(){
//         const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
//         setAddress(accounts[0]);
//     }
//     return(
//         <div>
//             <p>Current address: {address}</p>
//             <button onClick={changeAccount}>Change account</button>
//         </div>
//     )
// }