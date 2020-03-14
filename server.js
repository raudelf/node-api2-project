const express = require('express');

const server = express();

server.use(express.json());

// Routers


// Landing Page Endpoint
server.get('/', (req, res) => {
    res.send(`
    <h2>Node API Project 2</h2>
    <p>Welcome!</p>
    `)
})

module.exports = server;