'use server';

import React from 'react';
import Setup from './setweb3';


export default async function Home() {
  
  return (
    <div className="p-24">
      <p className='text-xl font-bold text-blue-dark'>SecureBid:</p>
      <h1 className='text-3xl font-bold text-blue-dark'>BLOCKTIONEER</h1>
      <Setup />
    </div>
  );
}