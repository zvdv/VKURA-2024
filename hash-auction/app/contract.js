'use server';

import React from "react";

export default async function Contract(props){

    // useEffect(() => {
    //     console.log(props);
    // });

    const {contract, setContract} = props;

    async function getVars(){
        let fairFee;
        let testing;

        try {
            fairFee = await contract.methods.fairFee().call({from: address});
            testing = await contract.methods.testing().call({from: address});
        } catch(error) {
    
        } finally {
            return "Fair fee is " + fairFee + " and testing is " + testing;
        }
    }

    return(
        <div>
            <p>Current contract address: {contract.options.address}</p>
            <p>{getVars()}</p>
        </div>
    )
}