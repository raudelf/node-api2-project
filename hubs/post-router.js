const express = require('express');
const Hubs = require('./hubs-model');

const router = express.Router();

router.post('/', (req, res) => {
    Hubs.insert(req.body)
        .then(hub => {
            console.log('New Post: ', hub);
                res.status(201).json(hub);
        })
        .catch(err => {
            if(!err.title && !err.contents) {
                console.log('Please provide title and contents for the post.');
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
            } else {
                console.log('There was an error while saving the post to the database: ', err)
                res.status(500).json({ error: 'There was an error while saving the post to the database' });
            }
        })
})

module.exports = router;