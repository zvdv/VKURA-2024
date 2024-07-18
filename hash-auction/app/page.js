import React from 'react';
import Login from './loginwallet';
import CurrentAccount from './displayaccount';

export default function page(){
    return(
        <div>
        <Login />
        <CurrentAccount />
        </div>
    )
}