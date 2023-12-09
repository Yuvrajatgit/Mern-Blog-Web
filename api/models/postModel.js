const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    summary: {
        type: String,
        required: [true, 'Summary is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    cover : {
        type: String
    },
    author:{
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;