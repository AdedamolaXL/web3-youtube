const express = require('express');
const { ethers } = require('ethers');
const { PRIVATE_KEY, INFURA_KEY } = require('./config');
const Token_ABI = require('./constants/ABI.json');
const cors = require('cors');


const app = express();
const port = 5000;



app.use(express.json());

const provider = new ethers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const Token_Address = '0x0d069AAA384E32A4D93db1Eef0261f720AC0fbb6';
// const address = '0xAADa3A46D4A94593CaB32484279B86A4AfD149B0';
// const amount = 100;
const tokenContract = new ethers.Contract(Token_Address, Token_ABI, wallet);

app.use(cors()); // Add this line to enable CORS for all routes

app.get('/', (req, res) => {
    res.send('Welcome to the token minting API!');
});

app.post('/mintTokens', async (req, res) => {
    console.log('POST request received at /mintTokens')
    console.log('Request Body:', req.body);;
    try {
        const { amount, address, hash, author} = req.body;
        if (!amount || !address || !hash || !author) {
            throw new Error('Amount or address is missing in request body');
        }

        const splitAmount = amount / 3;

        const tokenMintAddress = await tokenContract.mint(address, splitAmount);
        const receiptAddress = await tokenMint.wait();
        console.log('Transaction Receipt:', receiptAddress);

        const tokenMintAuthor = await tokenContract.mint(author, splitAmount);
        const receiptAuthor = await tokenContract.mint(author, splitAmount);
        console.log('Transaction Receipt:', receiptAuthor)

        res.send(`Tokens transferred: ${splitAmount} to ${address}, ${splitAmount} to ${author}, ${splitAmount} to ${address}`);
    } catch (error) {
        console.error('Error minting tokens:', error);
        res.status(500).send('Error minting tokens');
    }
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
