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
                console.log('There was an error while saving the post to the database: ', err);
                res.status(500).json({ error: 'There was an error while saving the post to the database' });
            };
        });
});

router.post('/:id/comments',  (req, res) => {
    const id = req.params.id;
    const commentObj = req.body;

    Hubs.insertComment(commentObj, id)
        .then((hub, id) => {
            if(id) {
                console.log('New Comment: ', hub);
                res.status(201).json({hub});
            };
        })
        .catch((err, id) => {
            if(!id) {
                console.log('The post with the specified ID does not exist.');
                res.status(404).json({ message: 'The post with the specified ID does not exist.' }) 
            } else {
                console.log('There was an error while saving the comment to the database.');
                res.status(500).json({ error: 'There was an error while saving the comment to the database.' })
            }
        })
})

module.exports = router;