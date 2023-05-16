import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { marketAddress, marketAddressABI } from './constant';
import { makeStorageClient } from '../lib/client';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const nftCurrency = 'ETH';
    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return alert('Please install Metamask!');

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        } else { console.log('No accounts found!'); }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
        if (!window.ethereum) return alert('Please install Metamask!');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        window.location.reload();
    };

    const uploadToIPFS = async (file) => {
        try {
            const client = makeStorageClient();
            const cid = await client.put(file);
            console.log('stored files with cid:', cid);
            return cid;
        } catch (error) {
            console.log('Error uploading file to IPFS', error);
        }
    };
    return (
        <NFTContext.Provider value={{ nftCurrency, currentAccount, connectWallet, uploadToIPFS }}>
            {children}
        </NFTContext.Provider>
    );
};
