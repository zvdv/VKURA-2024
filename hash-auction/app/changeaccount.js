// 'use server';

// export default async function changeAccount() {
//     let accounts = [];
//     try {
//         accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//     } catch (error) {
//         console.error('Error getting accounts: ', error);
//     } finally {
//         return accounts[0];
//     }

// }

// Doesn't work because window is not defined in the server