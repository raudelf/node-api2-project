const express = require('express');
const Hubs = require('./hubs-model');

const router = express.Router();

router.get('/', (req, res) => {
    Hubs.find(req.query)
        .then(hubs => {
            console.log('Fetched Data: ', hubs);
            res.status(201).json(hubs);
        })
        .catch(err => {
            console.log('The posts information could not be retrieved.', err);
            res.status(500).json({ error: 'The posts information could not be retrieved.'});
        });
});

module.exports = router;