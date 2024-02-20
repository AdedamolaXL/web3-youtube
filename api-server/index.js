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
const Token_Address = '0x44d52D9F508F6F6378b9e9bbC74cEB4f394CbC32';


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

        // const address = '0xAADa3A46D4A94593CaB32484279B86A4AfD149B0';
        // const amount = 100;
        // const author = '0x249aceFBE154F3E8Ec998f181a7Cb4711a729a72';
        // const hash = 'bafybeifup7u2tfbff4tbj66aaiuyty5dzi665lmi56w7slni4e6kwxcspe';

        const splitAmount = amount / 3;
        

        let tokenAmount = Math.ceil(splitAmount);
        console.log(tokenAmount);

        const tokenMintAddress = await tokenContract.mint(address, tokenAmount);
        const receiptAddress = await tokenMintAddress.wait();
        console.log('Transaction Receipt:', receiptAddress);

        const tokenMintAuthor = await tokenContract.mint(author, tokenAmount);
        const receiptAuthor = await tokenMintAuthor.wait()
        console.log('Transaction Receipt:', receiptAuthor)

        res.send(`Tokens transferred: ${tokenAmount} to ${address}, ${tokenAmount} to ${author}, ${tokenAmount} to ${address}`);
    } catch (error) {
        console.error('Error minting tokens:', error);
        res.status(500).send('Error minting tokens');
    }
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
