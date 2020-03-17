const express = require('express');
const Hubs = require('./hubs-model');

const router = express.Router();

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Hubs.findById(id)
        .then(obj => {
            res.status(201).json({message: 'Deleted the following object:', obj});
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an issue retrieving object for the Delete endpoint', err });
        });

    Hubs.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json(deleted).end();
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            };
        })
        .catch(err => {
            res.status(500).json({ error: 'The post could not be removed.', err})
        })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Hubs.update(id, body)
        .then((updated) => {
            if (updated) {
                if (body.title && body.contents) {
                    res.status(200).json({body});
                } else {
                    res.status(400).json({errorMessage: 'Please provide title and contents for the post.'});
                };
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            };
        })
        .catch(err => {
            res.status(500).json({ error: 'The post information could not be modified.' });
        });
});

module.exports = router;