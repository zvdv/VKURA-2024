'use client';

import React, { useEffect } from "react";

export default function Contract(props){

    useEffect(() => {
        console.log(props);
    });

    const {contract, setContract} = props;


    return(
        <div>
            <p>Current contract address: {contract}</p>
        </div>
    )
}