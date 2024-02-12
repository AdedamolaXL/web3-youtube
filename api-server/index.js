const express = require('express');
const fetch = require('node-fetch');

const app = express()
const port = 5000


let count = 0;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.json({count});
})

app.post('/api', (req, res) => {
    ++count;
    res.json({count});
});

app.listen(port, () => {
    console.log(`Listnening on port ${port}`)
})

fetch('http://localhost:5000/api', {
  method: 'POST',
})
.then(response => response.json())
.then(data => console.log(data));
