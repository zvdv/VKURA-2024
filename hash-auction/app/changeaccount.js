'use server';

export default async function changeAccount(getAccounts){
    if (typeof getAccounts !== "undefined") {
        let accounts;
        try{
            accounts = getAccounts;
        } catch(error) {
            console.error('Error getting accounts:', error);
        } finally {
            return accounts[0];
        }
    } else {
        console.log("Please install Metamask wallet");
        return '0x0000000000000000000000000000000000000000';
    }
}