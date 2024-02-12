require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_KEY = process.env.INFURA_KEY;

module.exports = {
    PRIVATE_KEY,
    INFURA_KEY,
};