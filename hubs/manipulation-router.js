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

module.exports = router;