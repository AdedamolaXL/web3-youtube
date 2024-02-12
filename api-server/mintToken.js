const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const { PRIVATE_KEY, INFURA_KEY } = require('./config');
const Token_ABI = require('./constants/ABI.json');
const { Router } = require('express');

const provider = new ethers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const Token_Address = '0x44d52D9F508F6F6378b9e9bbC74cEB4f394CbC32'
const address = '0xAADa3A46D4A94593CaB32484279B86A4AfD149B0';
const amount = 100


const tokenContract = new ethers.Contract(Token_Address,
     Token_ABI, wallet);

// async function getToken() {
//     const tokenMint = await tokenContract.mint(address, amount);
//     await tokenMint.wait();
//     console.log(`Tokens transferred to ${address}`);
// }

// getToken()

router.post('./mintTokens', async (req, res) => {
    try {
        const tokenMint = await tokenContract.mint(address, amount);
        await tokenMint.wait();
        console.log(`Tokens transferred to ${address}`);   

        res.status(200).json({ message: 'Tokens minted!'});
    } catch (error) {
        console.error('Error minting tokens:', error);
        res.status(500).json({ error: "An error while minting tokens"});
    }
});

module.exports = router;

// const Token_ABI = require('./constants/ABI.json')
// const Token_Address = '0x44d52D9F508F6F6378b9e9bbC74cEB4f394CbC32'

// const address = '0xAADa3A46D4A94593CaB32484279B86A4AfD149B0';
// const amount = 100;

// const provider = new ethers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
// const tokenContract = new ethers.Contract(Token_Address,
//     Token_ABI, signer);

// router.post('./mintTokens', async (req, res) => {
//     try {
//         // const { amount, address } = req.body;

//         const amountBN = ethers.utils.parseUnits(amount.toString(), 18);

//         const tx = await pieTokenContract.mint(address, amountBN);

//         await tx.wait();

//         res.status(200).json({ message: 'Tokens minted!'});
//     } catch (error) {
//         console.error('Error minting tokens:', error);
//         res.status(500).json({ error: "An error while minting tokens"});
//     }
// });

// module.exports = router;