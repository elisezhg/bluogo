const router = require('express').Router();
let User = require('../models/user-model');

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
    User.findOne({username : req.params.username})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


// GET request : a specific user
router.route('/id/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get pw of the user
router.route('/password/:username').get((req, res) => {
    User.find({username : req.params.username})
        .then(user => res.json(user[0].password))
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
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
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
            user.password = req.body.password;
            user.bio = req.body.bio;

            // save the user
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;