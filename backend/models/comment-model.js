const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    post_id: { type: String, required: true}
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;