const express = require('express');
const Hubs = require('./hubs-model');

const router = express.Router();

router.get('/', (req, res) => {
    Hubs.find(req.query)
        .then(hubs => {
            console.log('Fetched Data: ', hubs);
            res.status(200).json(hubs);
        })
        .catch(err => {
            console.log('The posts information could not be retrieved.', err);
            res.status(500).json({ error: 'The posts information could not be retrieved.'});
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Hubs.findById(id)
        .then(hub => {
            if (hub) {
                console.log('Found Data by ID: ', hub);
                res.status(200).json(hub);
            } else {
                console.log('The post with the specified ID does not exist.');
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            };
        })
        .catch(err => {
            console.log('The post information could not be retrieved.', err);
            res.status(500).json({ error: 'The post information could not be retrieved.' });
        });
});

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;

    Hubs.findPostComments(id)
        .then(hub => {
            if (hub) {
                console.log('Found Data by ID: ', hub);
                res.status(200).json(hub);
            } else {
                console.log('The post with the specified ID does not exist.');
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            };
        })
        .catch(err => {
            console.log('The comments information could not be retrieved.', err);
            res.status(500).json({ error: 'The comments information could not be retrieved.' });
        });
})

module.exports = router;