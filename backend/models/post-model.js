const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Comment = new Schema({
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true }
}, {
    timestamps: true,
});

const postSchema = new Schema({
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Array, required: true },
    comments: [Comment]
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;