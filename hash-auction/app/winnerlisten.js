// import React from "react";

// export default function WinnerListen(props){
//     const {contractInstance} = props;

//     contractInstance.events.WinnerSet()
//     .on("connected", function(subscriptionId){
//         console.log(subscriptionId);
//     })
//     .on('data', function(event){
//         console.log(event);
//     })
//     .on('changed', function(event){
//         console.log("Event removed: " + event);
//     })
//     .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
//         console.error("Error: " + error);
//         console.log("Network receipt (from error): " + receipt);
//     });

//     return(
//         <div>

//         </div>
//     )
// }
