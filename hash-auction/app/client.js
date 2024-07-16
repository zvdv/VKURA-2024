'use client'
 
import React from 'react';
import dynamic from 'next/dynamic';
 
const Hasher = dynamic(() => import('./encode.mjs'), { ssr: false });
 
export default () => <Hasher />