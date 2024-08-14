import React from 'react';

export default function Contract(props){

    // useEffect(() => {
    //     console.log(props);
    // });

    const {contract, setContract} = props;

    // async function getVars(){
    //     let fairFee;
    //     let testing;

    //     try {
    //         fairFee = await contract.methods.fairFee().call({from: address});
    //         testing = await contract.methods.testing().call({from: address});
    //     } catch(error) {
    
    //     } finally {
    //         return "Fair fee is " + fairFee + " and testing is " + testing;
    //     }
    // }

    return(
        <div>
            {contract == '0x0000000000000000000000000000000000000000' ?
            <p>Please deploy auction contract:</p> :
            <p>Current contract address: {contract}</p>}
        </div>
    )
}