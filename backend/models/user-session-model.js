const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    user_id: { type: String, required: true }
} , {
    timestamps: true,
});


const userSession = mongoose.model('userSession', userSessionSchema);

module.exports = userSession;