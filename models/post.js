const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Post schema
const Post = new Schema({
    title: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true
    },
    modified_date: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: String,
    comments: [{
        username: String,
        comment: String,
        create_date: Date,
        modified_date: Date
    }]
});

Post.methods.getAllComments = function () {
    return this.comments;
};

module.exports = mongoose.model('Post', Post);