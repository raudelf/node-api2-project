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
    const commentObj = req.body;
    console.log('Obj: ', commentObj);

    Hubs.insertComment(commentObj)
        .then((hub) => {
            if(hub.post_id) {
                console.log('New Comment: ', hub);
                res.status(201).json({hub});
            } else {
                console.log('The post with the specified ID does not exist.')
            }
        })
        .catch((err) => {
            if(!err.text) {
                console.log('Please provide text for the comment.');
                res.status(404).json({ errorMessage: 'Please provide text for the comment.' }); 
            } else {
                console.log('There was an error while saving the comment to the database.');
                res.status(500).json({ error: 'There was an error while saving the comment to the database.' });
            };
        });
})

module.exports = router;