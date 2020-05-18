const router = require('express').Router();
const Post = require('../models/post-model');
const Comment = require('../models/comment-model.js');
const UserSession = require('../models/user-session-model.js');
const ObjectId = require('mongodb').ObjectID;

// GET request : get all posts
router.route('/').get((req, res) => {
    Post.find().sort({createdAt: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});


// GET request : get all posts
router.route('/home/:index').get((req, res) => {
    Post.find().sort({createdAt: -1})
        .then(allPosts => {
            const index = +req.params.index;

            if (allPosts.length <= index) {
                res.json('end');
                return;
            }

            const posts = allPosts.slice(index, index + 10);
            res.json(posts)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET request : get the most liked posts
router.route('/trending/:index').get((req, res) => {
    Post.aggregate([
        { "$addFields": { "likesCount": { "$size": "$likes" }}},
        { "$sort": { "likesCount": -1 }}
      ])
        .then(allPosts => {
            const index = +req.params.index;

            if (allPosts.length <= index) {
                res.json('end');
                return;
            }

            const posts = allPosts.slice(index, index + 10);
            res.json(posts)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// GET request : get a specific post
router.route('/:user_id').get((req, res) => {
    Post.find({user_id : req.params.user_id}).sort({createdAt: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});


// DELETE request : delete a specific post
router.route('/:id/:token').delete((req, res) => {
    UserSession.findById(req.params.token)
        .then(session => {
            if (session == null) return res.status(401);

            Post.findByIdAndDelete(req.params.id)
                .then(post => {
                    if (post.user_id !== session.user_id) return res.status(400);
                    res.json('Post deleted.')
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(401).json('Error: ' + err));
});


// DELETE request : delete a specific comment
router.route('/comments/:id/:token').delete((req, res) => {
    UserSession.findById(req.params.token)
        .then(session => {
            if (session == null) return res.status(401);

            Post.findOne({'comments._id': ObjectId(req.params.id)}, function(err, post){
                if (err) return res.status(400).json('Error: ' + err);

                const comment = post.comments.id(req.params.id);

                if (comment.user_id !== session.user_id) return res.status(400);

                post.comments.id(req.params.id).remove();
                post.save()
                    .then(() => res.json('Comment deleted!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            });
        })
        .catch(err => res.status(401).json('Error: ' + err));
});


// POST request : add a new post
router.route('/add').post((req, res) => {
    UserSession.findById(req.body.token)
    .then(session => {
        if (session == null) return res.status(401);

        const user_id = session.user_id;
        const content = req.body.content;
        const likes = [];
        const comments = [];
    
        // create new post
        const newPost = new Post({
            user_id,
            content,
            likes,
            comments
        });
    
        // save the post in the database
        newPost.save()
            .then(() => res.json('Post added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(401).json('Error: ' + err));
});



// POST request : update a specific post
router.route('/update/:id').post((req, res) => {
    UserSession.findById(req.body.token)
        .then(session => {
            if (session == null) return res.status(401);

            Post.findById(req.params.id)
                .then(post => {
                    if (post.user_id !== session.user_id) return res.status(400);

                    post.content = req.body.content;

                    post.save()
                        .then(() => res.json('Post updated!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(401).json('Error: ' + err));
});


// POST request : update a specific comment
router.route('/comments/update/:id').post((req, res) => {
    UserSession.findById(req.body.token)
        .then(session => {
            if (session == null) return res.status(401);

            Post.findOne({'comments._id': ObjectId(req.params.id)}, function(err, post){
                if (err) return res.status(400).json('Error: ' + err);

                const comment = post.comments.id(req.params.id);

                if (comment.user_id !== session.user_id) return res.status(400);

                comment.content = req.body.content;
    
                post.save()
                    .then(() => res.json('Comment updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            });

        })
        .catch(err => res.status(401).json('Error: ' + err));
});



// Add a new comment to the post
router.route('/add_comment/:id').post((req, res) => {

    UserSession.findById(req.body.token)
        .then(session => {
            const user_id = session.user_id;
            const content = req.body.content;
            const createdAt = new Date();
        
            // create new comment
            const newComment = new Comment({
                user_id,
                content,
                createdAt
            });
        
            Post.findById(req.params.id)
                .then(post => {
        
                    post.comments.push(newComment);
        
                    post.save()
                        .then(() => res.json('Comment added!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(401).json('Error: ' + err));
})


// User likes the post
router.route('/like/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.likes.push(req.body.user_id);

            post.save()
                .then(() => res.json('Post liked'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(401).json('Error: ' + err));

})


// Unlike the the post
router.route('/unlike/:id').post((req, res) => {
    Post.findByIdAndUpdate(req.params.id, { $pull : {likes : req.body.user_id}}, {useFindAndModify : false}, function(err){
        if(err) {
          return res.status(500).json({'error' : 'error in deleting address'});
        }

        res.json('Post unliked');
    });
})


// Return all the likes of the post
router.route('/likes/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post.likes))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/comments/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post.comments))
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;