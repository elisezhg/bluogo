const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        //validate: [validateUsername, 'Please enter a valid username!']
    },

    dateOfBirth: { type: Date, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true},
    bio: { type: String, required: true }
    //image

} , {
    timestamps: true,
});


var validateUsername = function(username) {
    var re = /^[a-zA-Z0-9.\-_$@*!]{3,16}$/;
    return re.test(username)
};


const User = mongoose.model('User', userSchema);

module.exports = User;