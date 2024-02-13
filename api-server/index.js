const express = require('express');
const { ethers } = require('ethers');
const { PRIVATE_KEY, INFURA_KEY } = require('./config');
const Token_ABI = require('./constants/ABI.json');
const cors = require('cors');


const app = express();
const port = 5000;

const provider = new ethers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const Token_Address = '0x44d52D9F508F6F6378b9e9bbC74cEB4f394CbC32';
// const address = '0xAADa3A46D4A94593CaB32484279B86A4AfD149B0';
// const amount = 100;
const tokenContract = new ethers.Contract(Token_Address, Token_ABI, wallet);

app.use(cors()); // Add this line to enable CORS for all routes

app.get('/', (req, res) => {
    res.send('Welcome to the token minting API!');
});

app.post('/mintTokens', async (req, res) => {
    console.log('POST request received at /mintTokens');
    try {
        const tokenMint = await tokenContract.mint(address, amount);
        const receipt = await tokenMint.wait();
        console.log('Transaction Receipt:', receipt);
        res.send(`Tokens transferred to ${address}`);
    } catch (error) {
        console.error('Error minting tokens:', error);
        res.status(500).send('Error minting tokens');
    }
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
