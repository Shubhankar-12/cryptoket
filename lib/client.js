import { Web3Storage } from 'web3.storage';
import { NEXT_PUBLIC_WEB3STORAGE_TOKEN } from '../web3token';

export const makeStorageClient = () => new Web3Storage({ token: NEXT_PUBLIC_WEB3STORAGE_TOKEN });
console.log();
