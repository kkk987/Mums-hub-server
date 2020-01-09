const {
    getAllPosts,
    getPostById,
    addPost,
    deletePost,
    updatePost,
    addComment
} = require('../utils/utilities');

const getPosts = function (req, res) {
    // execute the query from getAllPosts
    getAllPosts(req).
    sort({
        modified_date: -1
    }).
    exec((err, posts) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.send(posts);
    });
};

const getPost = function (req, res) {
    // execute the query from getPostById
    getPostById(req).exec((err, post) => {
        if (err) {
            res.status(404);
            res.send("Post not found");
        }
        res.send(post);
    });
};

const makePost = function (req, res) {
    // add the username from req.user
    req.body.username = req.user.username;
    // save the Post instance from addPost
    addPost(req).save((err, post) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.status(201);
        res.send(post);
    });
};

const removePost = function (req, res) {
    // execute the query from deletePost
    deletePost(req.params.id).exec((err) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.sendStatus(204);

    });
};

const changePost = function (req, res) {
    // execute the query from updatePost
    updatePost(req).exec((err, post) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.status(200);
        res.send(post);
    });
};

// make a comment on a post
const makeComment = function (req, res) {
    // Check for error from middleware
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.message);
    } else {
        // resolve the promise from addComment
        // Add username to the request from the session
        req.body.username = req.user.username;
        addComment(req).then((post) => {
            res.status(200);
            res.send(post);
        }).catch((err) => {
            res.status(500);
            res.json({
                error: err.message
            });
        });
    }
}

const userAuthenticated = function (req, res, next) {
    console.log(`req body: ${req.user}`);
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
    }
}

const verifyAdmin = function (req, res, next) {
    // If post owner isn't currently logged in user, send forbidden

    if (req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    getPosts,
    getPost,
    makePost,
    removePost,
    changePost,
    makeComment,
    userAuthenticated,
    verifyAdmin
};