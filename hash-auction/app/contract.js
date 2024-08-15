'use client'
import React, {useEffect} from 'react';

export default function Contract(props){

    // useEffect(() => {
    //     console.log(props);
    // });

    const {contract, setContract} = props;

    useEffect(() => {
        console.log("Type of contract:", typeof contract);
        console.log("Value of contract:", contract);
    }, [contract]);

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
        <div className='p-2 w-fit border-2 border-turquoise-deep rounded-lg'>
            {contract == '0x0000000000000000000000000000000000000000' ?
            <p>No contract deployed.</p> :
            <p>Current contract address: {contract}</p>}
        </div>
    )
}