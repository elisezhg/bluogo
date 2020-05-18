const router = require('express').Router();
let User = require('../models/user-model');
let UserSession = require('../models/user-session-model.js');
const passwordHash = require('password-hash');


// GET request
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET request
router.route('/usernames').get((req, res) => {
    User.find({}, {username: 1, _id: 0})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET request : a specific user
router.route('/:username').get((req, res) => {
    User.findOne({username : req.params.username},{username: 1, firstName: 1, lastName: 1, bio: 1, dateOfBirth: 1, createdAt: 1})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


// GET request : a specific user
router.route('/id/:id').get((req, res) => {
    User.findById(req.params.id, {username: 1})
        .then(user => res.json(user.username))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Log in
router.route('/login/:username').post((req, res) => {
    User.findOne({username : req.params.username})
        .then(user => {
            if (passwordHash.verify(req.body.password, user.password)) {
                
                const user_id = user._id;

                UserSession.findOneAndDelete({user_id: user_id})
                    .catch(err => res.status(400).json('Error: ' + err));
                
                // Create a new user session
                const newUserSession = new UserSession({
                    user_id
                })

                newUserSession.save(
                    function(err, doc) {
                        if (err) return res.status(400).json('Error: ' + err);
                        res.json({token: doc._id});
                    }
                );

            } else {
                res.status(401).json('wrong pasword')
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/authentification/:username').post((req, res) => {
    User.findOne({username : req.params.username})
        .then(user => {
            if (passwordHash.verify(req.body.password, user.password)) {
                res.json('success');
            } else {
                res.status(401).json('Failed authentification');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
})



// Log out
router.route('/logout').post((req, res) => {
    UserSession.findByIdAndRemove(req.body.token, {useFindAndModify: false})
        .then(() => res.json('session killed'))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// POST request
router.route('/add').post((req, res) => {

    const username = req.body.username;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const bio = 'Nothing yet.'

    const newUser = new User({
        username,
        dateOfBirth,
        firstName,
        lastName,
        password,
        bio
    });

    // save the user in the database
    newUser.save(function(err, doc) {
        if (err) return res.status(400).json('Error: ' + err);

        // Create a new user session
        const user_id = doc._id;

        const newUserSession = new UserSession({
            user_id
        })

        newUserSession.save(
            function(err, doc) {
                if (err) return res.status(400).json('Error: ' + err);
                res.json({token: doc._id});
            }
        );
    })
});


// POST request
router.route('/edit/:username').post((req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {

            // update all the fields
            user.username = req.body.username;
            user.dateOfBirth = req.body.dateOfBirth;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.password = passwordHash.generate(req.body.password);
            user.bio = req.body.bio;

            // save the user
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/token/:token').get((req, res) => {
    UserSession.findById(req.params.token)
        .then(session => {
            User.findById(session.user_id, {username: 1, firstName: 1, lastName: 1, bio: 1, dateOfBirth: 1})
                .then(user => res.json(user))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;