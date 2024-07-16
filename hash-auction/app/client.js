'use client'
 
import React from 'react';
import dynamic from 'next/dynamic';
 
const Hasher = dynamic(() => import('./encode.js'), { ssr: false });
 
export default () => <Hasher />