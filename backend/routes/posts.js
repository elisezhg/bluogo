const router = require('express').Router();
let Post = require('../models/post-model');
let Comment = require('../models/comment-model');

// GET request : get all posts
router.route('/').get((req, res) => {
    Post.find().sort({createdAt: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});



// GET request : get a specific post
router.route('/:user_id').get((req, res) => {
    Post.find({user_id : req.params.user_id}).sort({createdAt: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});


// GET request : delete a specific post
router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// POST request : add a new post
router.route('/add').post((req, res) => {
    const user_id = req.body.user_id;
    const content = req.body.content;
    const like = req.body.like;

    // create new post
    const newPost = new Post({
        user_id,
        content,
        like
    });

    // save the post in the database
    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



// POST request : update a specific post
router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {

            // update all the fields
            post.user_id = req.body.user_id;
            post.content = req.body.content;
            post.like = req.body.like;

            // save the post
            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// GET request : get a specific comment
router.route('/comment/:id').get((req, res) => {
    Comment.find( { post_id : req.params.id })
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});


// FIND CHILD
router.route('/add_comment/:id').post((req, res) => {
    const user_id = req.body.user_id;
    const content = req.body.content;
    const post_id = req.params.id;

    // create new post
    const newComment = new Comment({
        user_id,
        content,
        post_id
    });

    // save the post in the database
    newComment.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;