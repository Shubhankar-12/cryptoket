import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { marketAddress, marketAddressABI } from './constant';
import { makeStorageClient } from '../lib/client';

const fetchContract = (signerOrProvider) => new ethers.Contract(marketAddress, marketAddressABI, signerOrProvider);

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

    const uploadToIPFS = async (file, path) => {
        try {
            const client = makeStorageClient();
            const added = await client.put(file);
            // console.log(`${cid}.ipfs.w3s.link/${path}`);
            const url = `${added}.ipfs.w3s.link/${path}`;
            return url;
        } catch (error) {
            console.log('Error uploading file to IPFS', error);
        }
    };

    const createSale = async (url, formInputPrice, isReselling, id) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        const price = ethers.utils.parseUnits(formInputPrice, 'ether');

        const contract = fetchContract(signer);
        const listingPrice = await contract.getListingPrice();

        const transaction = await contract.createToken(url, price, { value: listingPrice.toString() });

        await transaction.wait();

        console.log(contract);
    };

    const createNFT = async (formInput, fileUrl, path, router) => {
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) return;

        const data = JSON.stringify({ name, description, price, image: fileUrl });
        try {
            const client = makeStorageClient();
            const added = await client.put(data);
            const url = `${added}.ipfs.w3s.link/${path}`;
            console.log(url);
            await createSale(url, price);
            router.push('/');
        } catch (error) {
            console.log('Error uploading file to IPFS', error);
        }
    };

    return (
        <NFTContext.Provider value={{ nftCurrency, currentAccount, connectWallet, uploadToIPFS, createNFT }}>
            {children}
        </NFTContext.Provider>
    );
};
