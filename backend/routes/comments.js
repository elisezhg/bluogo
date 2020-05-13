const router = require('express').Router();
let Comment = require('../models/comment-model');

// GET request : get all comments
router.route('/').get((req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});



// GET request : get a specific comment
router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));
});


// GET request : delete a specific comment
router.route('/:id').delete((req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// POST request : add a new comment
router.route('/add').post((req, res) => {
    const usernameId = req.body.username_id;
    const content = req.body.content;
    const postId = req.body.post_id;

    // create new post
    const newComment = new Comment({
        usernameId,
        content,
        postId
    });

    // save the post in the database
    newComment.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



// POST request : update a specific comment
router.route('/update/:id').post((req, res) => {
    Comment.findById(req.params.id)
        .then(post => {

            // update all the fields
            post.username_id = req.body.username_id;
            post.content = req.body.content;
            post.post_id = req.body.post_id;

            // save the comment
            post.save()
                .then(() => res.json('Comment updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;