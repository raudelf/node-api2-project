const express = require('express');
const postRouter = require('./hubs/post-router');
const getRouter = require('./hubs/get-router');
const manipulationRouter = require('./hubs/manipulation-router');

const server = express();

server.use(express.json());

// Routers
server.use('/api/posts', postRouter);
server.use('/api/posts', getRouter);
server.use('/api/posts', manipulationRouter);

// Landing Page Endpoint
server.get('/', (req, res) => {
    res.send(`
    <h2>Node API Project 2</h2>
    <p>Welcome!</p>
    `)
})

module.exports = server;