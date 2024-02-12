import { ethers } from 'ethers';

export async function getUserAddress() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const UserAddress = await signer.getAddress();
    return UserAddress;
}